import React from "react";
import "../styles.css";
import { HashRouter, Route } from "react-router-dom";
import Menu from "./menu/Menu";
import Game from "./game/Game";
import Scores from "./scores/Scores";

const App = () => {
    return (
        <div>
            <HashRouter>
                <Route path="/" exact component={Menu} />
                <Route path="/game" exact component={Game} />
                <Route path="/scores" exact component={Scores} />
            </HashRouter>
        </div>
    );
};

export default App;