import React from "react";
import ReactDOM from "react-dom";
import { HarperDBProvider } from "use-harperdb";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

require("dotenv").config();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <HarperDBProvider
            url={process.env.REACT_APP_URL_DB}
            user={process.env.REACT_APP_USER_DB}
            password={process.env.REACT_APP_PASSWORD_DB}
        >
            <App />
        </HarperDBProvider>
    </Provider>,
    document.getElementById("root")
);