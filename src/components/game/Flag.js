import React from "react";
import { connect } from "react-redux";

const Flag = ({ srcPattern, game }) => {
    return (
        <div className="game-flag">
            <img alt="flag" src={srcPattern[game.level]} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        game: state.game,
        srcPattern: state.countries.srcPattern
    }
};

export default connect(mapStateToProps)(Flag);