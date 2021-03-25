import React from "react";
import "../styles.css";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Game from "./game/Game";
import Scores from "./scores/Scores";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={Menu} />
                <Route path="/game" exact component={Game} />
                <Route path="/scores" exact component={Scores} />
            </BrowserRouter>
        </div>
    );
};

export default App;