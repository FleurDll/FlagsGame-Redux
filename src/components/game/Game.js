/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resetState, winning, loosing, wrongAnswers, startTimer, stopTimer } from "../../actions";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import winSound from "../../sounds/win.mp3";
import loseSound from "../../sounds/lose.mp3";
import restartSound from "../../sounds/short-click.mp3";
import endSound from "../../sounds/end-game.mp3";
import Button from "../Button";
import Header from "../Header";
import ScoreLevel from "./ScoreLevel";
import Flag from "./Flag";
import ResponsesCard from "./ResponsesCard";
import EndOfGame from "./EndOfGame";


const Game = (props) => {

    const [playWin] = useSound(
        winSound,
        { volume: 0.25 }
    );

    const [playLose] = useSound(
        loseSound,
        { volume: 1 }
    );

    const [playRestart] = useSound(
        restartSound,
        { volume: 0.50 }
    );

    const [playEnd] = useSound(
        endSound,
        { volume: 0.25 }
    );

    useEffect(() => {
        const beginning = Date.now();
        props.startTimer(beginning);
    }, [props.countries.length]);

    useEffect(() => {
        const start = props.game.start;
        const end = Date.now();
        const timer = (Math.round((end - start) / 1000) * 100 / 100);
        props.stopTimer(timer);
    }, [props.game.level]);

    const handleAnswer = (chosenCountry) => {
        const correctCountry = props.namePattern[props.game.level];

        if (chosenCountry === correctCountry) {
            props.winning(props.game.level, props.game.score);
            playWin();
            document.body.classList.add("win");
            setTimeout(() => {
                document.body.classList.remove("win");
            }, 350);
        } else if (chosenCountry !== correctCountry) {
            props.loosing(props.game.level);
            props.wrongAnswers(props.namePattern[props.game.level], props.srcPattern[props.game.level]);
            playLose();
            document.body.classList.add("wrong");
            setTimeout(() => {
                document.body.classList.remove("wrong");
            }, 350);
        }
    };

    if (props.game.level === props.game.numberOfLevel && props.game.numberOfLevel !== 0) {
        return <EndOfGame playEnd={playEnd} />
    }

    const headerItem = (
        <>
            <Link
                to="/"
                onClick={(() => props.resetState())}
                className="item-header">
                <Button
                    onButtonClick={() => playRestart()}
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
            {props.countries.length !== 0 &&
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

export default connect(mapStateToProps, { resetState, winning, loosing, wrongAnswers, startTimer, stopTimer })(Game);