import React from "react";
import { connect } from "react-redux";

const ScoreLevel = ({ game }) => {
    return (
        <div className="game-info">
            <div className="game-info-element">
                <h4 className="element-name">Level</h4>
                <h4 className="element-content">{game.level}/{game.numberOfLevel}</h4>
            </div>
            <div className="game-info-element">
                <h4 className="element-name">Score</h4>
                <h4 className="element-content">{game.score}/{game.numberOfLevel}</h4>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { game: state.game }
}

export default connect(mapStateToProps)(ScoreLevel);