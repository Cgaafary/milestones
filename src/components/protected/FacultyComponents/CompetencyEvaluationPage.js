import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Import Queries and Mutations
import getCompetencyData from '../../../data/queries/getCompetencyData';
import submitEvaluation from '../../../data/mutations/submitEvaluation';

// Custom Components
import MilestoneCard from './MilestoneCard';
import { getObjectById, reformatArrayByLevel } from '../../../customFunctions';

class CompetencyEvaluationPage extends Component {
    constructor() {
        super();

        // Bind functions that are passed via props
        this.handleMilestoneResponse = this.handleMilestoneResponse.bind(this);

        this.state = {
            currentMilestones: [],
            displayedMilestones: [],
            currentLevelLength: [],
            milestoneIndex: 0,
            achievedAtCurrentLvl: 0,
            payload: []
        }
    }

    // Add asynchronous data to state when loaded
    componentWillReceiveProps(nextProps) {
        const { loading } = nextProps.data;
        if (loading) { return }

        const { milestones } = nextProps.data.Competency;
        const milestonesByLevel = reformatArrayByLevel(milestones);
        this.setState({
            currentMilestones: milestonesByLevel,
            displayedMilestones: milestonesByLevel[0],
            currentLevelLength: milestonesByLevel[0].length
        })
    }  

    // Conditional logic after each render.
    // Advances to the next Level if all responses are Yes in the current level, submits payload if false
    componentDidUpdate() {
        const { achievedAtCurrentLvl, currentLevelLength, displayedMilestones, milestoneIndex } = this.state;
        if (achievedAtCurrentLvl === currentLevelLength) {
            console.log(`Level ${milestoneIndex + 1} achieved`);
            this.advanceLevel();
        } else if (!displayedMilestones.length) {
            this.submitPayload();
        }
    }

     // Renders milestone cards with descriptions
    renderMilestoneCards(milestones) { 
        return (
            milestones.map(({level, description, id}) => (
                <MilestoneCard 
                    description={description} 
                    level={level}
                    key={id} 
                    id={id}
                    handleMilestoneResponse={this.handleMilestoneResponse}
                />
            ))
        );
    }

    handleMilestoneResponse({milestone, achieved}) {
        var { payload, displayedMilestones, achievedAtCurrentLvl } = this.state;
        const { evaluatingUser, evaluatedUser } = this.props;

        // Filters out the submitted milestone evaluated
        const milestoneObject = getObjectById(milestone, displayedMilestones);
        const filteredMilestones = displayedMilestones.filter(value => value !== milestoneObject);
        this.setState({displayedMilestones: filteredMilestones});
        
        // Conditional logic to change state if a milestone is achieved
        if (achieved) {
            payload.push({milestone, achieved, evaluatedUser, evaluatingUser});
            this.setState({
                achievedAtCurrentLvl: achievedAtCurrentLvl + 1,
                payload
            });

            // Handle rejected responses
        } else {
            payload.push({milestone, achieved, evaluatedUser, evaluatingUser});
            this.setState({payload});
        }
        
    }

     // Advance level if all milestones in current level are completed
    advanceLevel () {
        const { milestoneIndex, currentMilestones } = this.state;
        const newIndex = milestoneIndex + 1;

        // Exit function if there are no more levels
        if (!currentMilestones[newIndex]) { 
            console.log('Completed all levels');
            this.submitPayload();
            return; 
        }

        this.setState({
            displayedMilestones: currentMilestones[newIndex],
            milestoneIndex: newIndex,
            currentLevelLength: currentMilestones[newIndex].length,
            achievedAtCurrentLvl: 0
        })
    }

    // Submits evaluation data to the server **Pending
    submitPayload() {
        const { payload } = this.state;
        // eslint-disable-next-line
        payload.map(({achieved, evaluatedUser, evaluatingUser, milestone}) => {
            this.props.mutate({
                variables: {
                    achieved,
                    evaluatedUserId: evaluatedUser,
                    evaluatingUserId: evaluatingUser,
                    milestoneId: milestone
                }
            })
            .then(({ data }) => {
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error', error);
            })
        });
    }

    render() {
        const {loading, Competency} = this.props.data
        if(loading) {return <div>Loading...</div>}
    
        const {title} = Competency
        return (
            <div>
                <h4>Competency: {title}</h4>
                {this.renderMilestoneCards(this.state.displayedMilestones)}
            </div>
        );
    }
}

export default graphql(submitEvaluation)(
graphql(getCompetencyData, {
    options: ({match}) => ({ variables: { competencyId: match.params.id }})
})(CompetencyEvaluationPage));