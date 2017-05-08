import React from 'react';

export default ({id, description, level, handleMilestoneResponse}) => {
    const handleYesResponse = () => {
        handleMilestoneResponse({milestone: id, achieved: true,});
    }

    const handleNoResponse = () => {
        handleMilestoneResponse({milestone: id, achieved: false});
    }

    return (
        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp milestone-card">
        <p><strong>Level { level }</strong></p>
        <p>{description}</p>
        <div className="milestone-button">
            <button
                className="mdl-button mdl-js-button mdl-button--primary"
                onClick={handleNoResponse}
            >No</button>
            <button
                className="mdl-button mdl-js-button mdl-button--primary"
                onClick={handleYesResponse}
            >Yes</button>
        </div>
        </div>
    );
}
