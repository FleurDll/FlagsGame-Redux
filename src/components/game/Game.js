/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resetCountries, resetGame, winning, loosing, wrongAnswers, startTimer, stopTimer } from "../../actions";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import winSound from "../../sounds/win.mp3";
import loseSound from "../../sounds/lose.mp3";
import clickSound from "../../sounds/short-click.mp3";
import endSound from "../../sounds/end-game.mp3";
import Button from "../Button";
import Header from "../Header";
import ScoreLevel from "./ScoreLevel";
import Flag from "./Flag";
import ResponsesCard from "./ResponsesCard";
import EndOfGame from "./endOfGame/EndOfGame";

const Game = ({ countries, namePattern, srcPattern, game, resetCountries, resetGame }) => {

    const [playWin] = useSound(
        winSound,
        { volume: 0.25 }
    );

    const [playLose] = useSound(
        loseSound,
        { volume: 1 }
    );

    const [playClick] = useSound(
        clickSound,
        { volume: 0.50 }
    );

    const [playEnd] = useSound(
        endSound,
        { volume: 0.25 }
    );

    useEffect(() => {
        const beginning = Date.now();
        startTimer(beginning);
    }, [countries.length]);

    useEffect(() => {
        const start = game.start;
        const end = Date.now();
        const timer = (Math.round((end - start) / 1000) * 100 / 100);
        stopTimer(timer);
    }, [game.level]);

    const handleAnswer = (chosenCountry) => {
        const correctCountry = namePattern[game.level];

        if (chosenCountry === correctCountry) {
            winning(game.level, game.score);
            playWin();
            document.body.classList.add("win");
            setTimeout(() => {
                document.body.classList.remove("win");
            }, 350);
        } else if (chosenCountry !== correctCountry) {
            loosing(game.level);
            wrongAnswers(namePattern[game.level], srcPattern[game.level]);
            playLose();
            document.body.classList.add("wrong");
            setTimeout(() => {
                document.body.classList.remove("wrong");
            }, 350);
        }
    };

    if (game.level === game.numberOfLevel && game.numberOfLevel !== 0) {
        return <EndOfGame playEnd={playEnd} />
    }

    const headerItem = (
        <>
            <Link
                to="/"
                onClick={(() => {
                    resetCountries();
                    resetGame();
                })}
                className="item-header">
                <Button
                    onButtonClick={() => playClick()}
                    buttonText="Return"
                    customClass="inverted navigation-button"
                />
            </Link>
        </>
    );

    const screenWidth = window.screen.availWidth;
    return (
        <div>
            <Header
                headerItem={headerItem}
                itemPosition="right"
            />
            {countries.length !== 0 &&
                <div className={screenWidth > 515 ? "card" : "game-card"}>
                    <div className="game-card-header">
                        <img className="game-img" alt="earth" src="../images/worldwide.svg" />
                        <h1 className="game-title">Flags Game</h1>
                    </div>
                    <ScoreLevel />
                    <div className="separation"></div>
                    <div className="game-pattern">
                        <Flag />
                        <ResponsesCard sendData={handleAnswer} />
                    </div>
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        countries: Object.values(state.countries.allData),
        namePattern: state.countries.namePattern,
        srcPattern: state.countries.srcPattern,
        game: state.game
    }
};

export default connect(mapStateToProps, { resetCountries, resetGame, winning, loosing, wrongAnswers, startTimer, stopTimer })(Game);