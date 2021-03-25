import React, { useState } from "react";
import { connect } from "react-redux";
import { useHarperDB } from "use-harperdb";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import restartSound from "../../sounds/short-click.mp3";
import dataPlayer from "../../hooks/dataPlayer";
import GoogleAuth from "../GoogleAuth";
import Header from "../Header";
import TotalScores from "./TotalScores";
import WorldScores from "./WorldScores";
import EuropeScores from "./EuropeScores";
import AfricaScores from "./AfricaScores";
import AsiaScores from "./AsiaScores";
import AmericasScores from "./AmericasScores";
import OceaniaScores from "./OceaniaScores";
import ScoresExplanation from "./ScoresExplanation";

const Scores = () => {
    const [filter, setFilter] = useState("Total");
    const [showExplanation, setShowExplanation] = useState(false);

    const [playRestart] = useSound(
        restartSound,
        { volume: 0.50 }
    );

    const screenWidth = window.screen.availWidth;

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

    for (var x = 0; x < nameList.length; x++) {
        // eslint-disable-next-line no-loop-func
        const personnalData = data.filter(game => game.name === nameList[x]);
        allDataPlayer.push(dataPlayer(personnalData, nameList[x]));
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

    const onLinkClick = (location) => {
        setFilter(location);
        playRestart();
    };

    const menuLargeScreen = (
        <div className="ui inverted vertical pointing menu score-filter">
            <Link to="/scores" onClick={() => onLinkClick("Total")} className={`item ${filter === "Total" && "active"}`}>Total</Link>
            <Link to="/scores" onClick={() => onLinkClick("World")} className={`item ${filter === "World" && "active"}`}>World</Link>
            <Link to="/scores" onClick={() => onLinkClick("Europe")} className={`item ${filter === "Europe" && "active"}`}>Europe</Link>
            <Link to="/scores" onClick={() => onLinkClick("Africa")} className={`item ${filter === "Africa" && "active"}`}>Africa</Link>
            <Link to="/scores" onClick={() => onLinkClick("Asia")} className={`item ${filter === "Asia" && "active"}`}>Asia</Link>
            <Link to="/scores" onClick={() => onLinkClick("Americas")} className={`item ${filter === "Americas" && "active"}`}>Americas</Link>
            <Link to="/scores" onClick={() => onLinkClick("Oceania")} className={`item ${filter === "Oceania" && "active"}`}>Oceania</Link>
        </div>
    );

    const menuSmallScreen = (
        <>
            <div className="ui inverted secondary pointing menu score-filter">
                <Link to="/scores" onClick={() => onLinkClick("Total")} className={`item ${filter === "Total" && "active"}`}>Total</Link>
                <Link to="/scores" onClick={() => onLinkClick("World")} className={`item ${filter === "World" && "active"}`}>World</Link>
                <Link to="/scores" onClick={() => onLinkClick("Europe")} className={`item ${filter === "Europe" && "active"}`}>Europe</Link>
                <Link to="/scores" onClick={() => onLinkClick("Africa")} className={`item ${filter === "Africa" && "active"}`}>Africa</Link>
            </div>
            <div className="ui inverted secondary pointing menu score-filter">
                <Link to="/scores" onClick={() => onLinkClick("Asia")} className={`item ${filter === "Asia" && "active"}`}>Asia</Link>
                <Link to="/scores" onClick={() => onLinkClick("Americas")} className={`item ${filter === "Americas" && "active"}`}>Americas</Link>
                <Link to="/scores" onClick={() => onLinkClick("Oceania")} className={`item ${filter === "Oceania" && "active"}`}>Oceania</Link>
            </div>
        </>
    );

    return (
        <div>
            <Header headerItem={headerItem} itemPosition="right" />
            <div className="card score-card">
                {screenWidth >= 850 ? menuLargeScreen : menuSmallScreen}
                <div className="score-table">
                    {filter === "Total" && <TotalScores allDataPlayer={allDataPlayer} />}
                    {filter === "World" && <WorldScores allDataPlayer={allDataPlayer} />}
                    {filter === "Europe" && <EuropeScores allDataPlayer={allDataPlayer} />}
                    {filter === "Africa" && <AfricaScores allDataPlayer={allDataPlayer} />}
                    {filter === "Asia" && <AsiaScores allDataPlayer={allDataPlayer} />}
                    {filter === "Americas" && <AmericasScores allDataPlayer={allDataPlayer} />}
                    {filter === "Oceania" && <OceaniaScores allDataPlayer={allDataPlayer} />}
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

const mapStateToProps = state => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(Scores);