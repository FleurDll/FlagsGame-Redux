import React from "react";
import { connect } from "react-redux";
import { resetCountries, resetGame } from "../actions";
import { Link } from "react-router-dom";

const Header = ({ resetGame, resetCountries, itemPosition, headerItem }) => {
    const screenWidth = window.screen.availWidth;

    return (
        <div className="ui secondary pointing menu navigation">
            <Link to="/" onClick={(() => {
                resetCountries();
                resetGame();
            })}>
                <div className="header-title-img">
                    <img className="header-img" alt="earth" src="../images/worldwide.svg" />
                    {screenWidth > 515 ? <h2 className="header-title">Flags Game</h2> : null}
                </div>
            </Link>
            <div className={`menu ${itemPosition}`}>
                {headerItem}
            </div>
        </div>
    );
};

export default connect(null, { resetCountries, resetGame })(Header);