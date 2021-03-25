/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHarperDB } from "use-harperdb";
import { stopTimer, resetState } from "../../actions";
import { Link } from "react-router-dom";
import Header from "../Header";
import EndOfGameReview from "./EndOfGameReview";

const EndOfGame = ({ auth, game, resetState, playEnd }) => {
    useEffect(() => {
        playEnd();
    }, []);

    const { userId, name } = auth;
    const { numberOfLevel, score, location, time } = game;
    const options = { month: 'numeric', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString("fr-FR", options);
    const percentage = Math.round((score / numberOfLevel) * 100);

    const pointsCalcul = (score, numberOfLevel) => {
        const percentageScore = Math.round((score / numberOfLevel) * 100);

        const pointsList = [];

        if (score === numberOfLevel) {
            pointsList.push(score + 10);
        } else if (percentageScore < 100 && percentageScore >= 75) {
            pointsList.push(score + 5);
        } else if (percentageScore < 75 && percentageScore >= 50) {
            pointsList.push(score + 2);
        } else if (percentageScore < 50 && percentageScore >= 25) {
            pointsList.push(score - 2);
        } else {
            pointsList.push(score - 5);
        }

        return (pointsList.reduce((a, b) => a + b));
    };

    const points = pointsCalcul(game.score, game.numberOfLevel);

    let sql = "";
    !userId ? sql = "SELECT * FROM flagsGame.game" : sql = `INSERT INTO flagsGame.game (date, location, name, points, percentage, number_of_level, score, time, userid) VALUES("${currentDate}", "${location}", "${name}",${points} , ${percentage}, ${numberOfLevel}, ${score}, ${time}, "${userId}")`;

    useHarperDB({
        query: {
            operation: "sql",
            sql: sql
        },
        interval: 1000 * 120
    });

    const headerItem = (
        <>
            <Link
                to="/"
                className="item item-header"
                onClick={(() => resetState())}
            >
                Menu</Link>
            <Link
                to="/scores"
                className="item item-header"
                onClick={(() => resetState())}
            >
                Scores</Link>
        </>
    );

    const renderedDuration = () => {
        const minutes = Math.floor(game.time / 60);
        const secondes = game.time - minutes * 60;
        const duration = `${minutes}m${secondes}s`;
        return duration;
    };

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

    const screenWidth = window.screen.availWidth;

    return (
        <div>
            <Header headerItem={headerItem} itemPosition="right" />
            <div className={screenWidth > 515 ? "card" : "game-card"}>
                <div>
                    <h1>End of The Game !</h1>
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
                    <h3>
                        {renderedEndMessage()}
                    </h3>
                    <h5 className="end-game-points">{userId ? `You ${points >= 0 ? "won" : "lose"} ${points} points` : "Sign In if you want your score to be registered"}</h5>
                </div>
                {game.wrongAnswers.length !== 0 && <EndOfGameReview />}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        game: state.game
    };
};

export default connect(mapStateToProps, { stopTimer, resetState })(EndOfGame);