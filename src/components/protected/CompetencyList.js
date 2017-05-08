import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';

import getAllCompetencies from '../../data/queries/getAllCompetencies';

class CompetencyList extends Component {
    constructor() {
        super();
        this.renderCompetencyList = this.renderCompetencyList.bind(this);
    }

    renderCompetencyList(competencies, url) {
       return competencies.map(({id, title}) => (
                <li key={id}><Link to={`${url}/${id}`}>{title}</Link></li>
            ))
    };

    render() {
        const { loading, allCompetencies } = this.props.data;
        if (loading) { return <div>Loading...</div>}
    
        // Adjusts url to singular. May need to re-approach this later
        const { url } = this.props.match;
        const newUrl = `${url.slice(0, -3)}y`
        
        return(
            <div>
                <h3>Choose a Competency</h3>
                <ul>{this.renderCompetencyList(allCompetencies, newUrl)}</ul>
            </div>
        );
    }
}

export default withRouter(
    graphql(getAllCompetencies)(CompetencyList)
);