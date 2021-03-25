import React from "react";
import { connect } from "react-redux";

const EndOfGameReview = (props) => {
    return (
        <div className="end-game-footer">
            <p>To review your flags knowledge :</p>
            {props.game.wrongAnswers.map(answer => {
                return (
                    <div key={answer.name}>
                        <div className="wrong-answers">
                            <img className="wrong-answers-flag" alt="drapeaux" src={answer.flag} />
                            <h4 className="wrong-answers-country">{answer.name}</h4>
                        </div>
                        <div className="separation"></div>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = state => {
    return { game: state.game };
};

export default connect(mapStateToProps)(EndOfGameReview);