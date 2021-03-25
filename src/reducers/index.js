import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import countriesReducer from "./countriesReducer";
import allGamesReducer from "./allGamesReducer";

export default combineReducers({
    auth: authReducer,
    game: gameReducer,
    countries: countriesReducer,
    gamesList: allGamesReducer
});