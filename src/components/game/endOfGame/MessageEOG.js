import React from "react";
import { connect } from "react-redux";

const MessageEOG = ({ game }) => {
    const renderedEndMessage = () => {
        const lowScore = game.numberOfLevel / 4;
        const highScore = game.numberOfLevel / 1.3;
        let message = "";

        switch (true) {
            case (game.score < lowScore):
                return message = "Well... It wasn't famous. Keep on going!";
            case (game.score > lowScore && game.score < highScore):
                return message = "You're on the right track! Keep on going!";
            case (game.score >= highScore && game.score < game.numberOfLevel):
                return message = "Wow, that was impressive! Keep it up!";
            case (game.score === game.numberOfLevel):
                return message = "Well... You're just too cool for us!";
            default:
                return message;
        }
    };
    return (
        <div>
            {renderedEndMessage()}
        </div>
    );
};

const mapStateToProps = state => {
    return { game: state.game }
}

export default connect(mapStateToProps)(MessageEOG);