import React from "react";
import { Link } from "react-router-dom";

const MenuSmallScreen = ({ setFilter, playRestart, filter }) => {
    const onLinkClick = (location) => {
        setFilter(location);
        playRestart();
    };

    return (
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
};

export default MenuSmallScreen