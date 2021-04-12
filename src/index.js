import React from "react";
import ReactDOM from "react-dom";
import { HarperDBProvider } from "use-harperdb";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <HarperDBProvider
            url="https://cloud-flag-fleurtech.harperdbcloud.com"
            user="FleurDll"
            password="FlowerPower*18"
        >
            <App />
        </HarperDBProvider>
    </Provider>,
    document.getElementById("root")
);