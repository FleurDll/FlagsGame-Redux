import React from "react";
import { connect } from "react-redux";

const ScoreTimeEOG = ({ game }) => {
    const renderedDuration = () => {
        const minutes = Math.floor(game.time / 60);
        const secondes = game.time - minutes * 60;
        const duration = `${minutes}m${secondes}s`;
        return duration;
    };

    return (
        <div className="end-game-header">
            <div className="end-game-info">
                <img className="end-game-icon" alt="score" src="../images/badge.svg" />
                <h4>{game.score}/{game.numberOfLevel}</h4>
            </div>
            <div className="end-game-info">
                <img className="end-game-icon" alt="timer" src="../images/timer.svg" />
                <h4>{renderedDuration()}</h4>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { game: state.game }
};

export default connect(mapStateToProps)(ScoreTimeEOG);