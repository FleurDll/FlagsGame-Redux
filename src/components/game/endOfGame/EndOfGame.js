/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHarperDB } from "use-harperdb";
import { stopTimer, resetCountries, resetGame } from "../../../actions";
import { Link } from "react-router-dom";
import Header from "../../Header";
import ScoreTimeEOG from "./ScoreTimeEOG";
import ReviewEOG from "./ReviewEOG";
import MessageEOG from "./MessageEOG";

const EndOfGame = ({ auth, game, resetCountries, resetGame, playEnd }) => {
    useEffect(() => {
        playEnd();
    }, []);

    const { userId, name } = auth;
    const { numberOfLevel, score, location, time } = game;
    const options = { month: 'numeric', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString("fr-FR", options);
    const percentage = Math.round((score / numberOfLevel) * 100);

    const calcPoints = (score, numberOfLevel) => {
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

    const points = calcPoints(game.score, game.numberOfLevel);

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
                onClick={(() => {
                    resetCountries();
                    resetGame();
                })}
            >
                Menu</Link>
            <Link
                to="/scores"
                className="item item-header"
                onClick={(() => {
                    resetCountries();
                    resetGame();
                })}
            >
                Scores</Link>
        </>
    );

    const screenWidth = window.screen.availWidth;

    return (
        <div>
            <Header headerItem={headerItem} itemPosition="right" />
            <div className={screenWidth > 515 ? "card" : "game-card"}>
                <div>
                    <h1>End of The Game !</h1>
                    <ScoreTimeEOG />
                    <h3>
                        <MessageEOG />
                    </h3>
                    <h5 className="end-game-points">{userId ? `You ${points >= 0 ? "won" : "lose"} ${points} points` : "Sign In if you want your score to be registered"}</h5>
                </div>
                {game.wrongAnswers.length !== 0 && <ReviewEOG />}
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

export default connect(mapStateToProps, { stopTimer, resetCountries, resetGame })(EndOfGame);