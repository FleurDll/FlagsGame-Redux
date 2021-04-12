import React, { useState, useEffect } from "react";
import { useHarperDB } from "use-harperdb";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import restartSound from "../../sounds/short-click.mp3";
import dataPlayer from "../../hooks/dataPlayer";
import GoogleAuth from "../GoogleAuth";
import Header from "../Header";
import MenuLargeScreen from "./MenuLargeScreen";
import MenuSmallScreen from "./MenuSmallScreen";
import LocationPath from "./LocationPath";
import ScoresExplanation from "./ScoresExplanation";

const Scores = () => {
    const [filter, setFilter] = useState("Total");
    const [showExplanation, setShowExplanation] = useState(false);

    const screenWidth = window.screen.availWidth;

    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useState({});

    useEffect(() => { // fixing : cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
        return () => {
            setState({});
        };
    }, []);

    const [playRestart] = useSound(
        restartSound,
        { volume: 0.50 }
    );

    let [data] = useHarperDB({
        query: {
            operation: "sql",
            sql: "SELECT * FROM flagsGame.game"
        },
        interval: 1000 * 60
    });

    const nameList = [];

    for (var i = 0; i < data.length; i++) {
        nameList.indexOf(data[i].name) === -1 && nameList.push(data[i].name);
    }

    const allDataPlayer = [];

    for (var j = 0; j < nameList.length; j++) {
        // eslint-disable-next-line no-loop-func
        const personnalData = data.filter(game => game.name === nameList[j]);
        allDataPlayer.push(dataPlayer(personnalData, nameList[j]));
    }

    const handleLinkClick = () => {
        playRestart();
    };

    const headerItem = (
        <>
            <Link onClick={handleLinkClick} to="/" className="item item-header">Menu</Link>
            <Link onClick={handleLinkClick} to="/scores" className="item item-header">Scores</Link>
            <GoogleAuth />
        </>
    );

    if (!data) {
        return (
            <div>
                <Header headerItem={headerItem} itemPosition="right" />
                <div className="ui active dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header headerItem={headerItem} itemPosition="right" />
            <div className="card score-card">
                {screenWidth >= 850 ?
                    <MenuLargeScreen filter={filter} setFilter={setFilter} playRestart={playRestart} />
                    :
                    <MenuSmallScreen filter={filter} setFilter={setFilter} playRestart={playRestart} />
                }
                <div className="score-table">
                    <LocationPath filter={filter} allDataPlayer={allDataPlayer} />
                </div>
            </div>
            <div>
                <h5
                    className="score-question"
                    onMouseEnter={() => setShowExplanation(true)}
                ><i className="question icon"></i>How your score is calculated</h5>
                <div style={{ color: "#787878" }} className={`score-explanation ui message black ${!showExplanation && "hidden"}`}>
                    <ScoresExplanation setShowExplanation={setShowExplanation} showExplanation={showExplanation} />
                </div>
            </div>
        </div>
    );
};

export default Scores;