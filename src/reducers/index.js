import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import countriesReducer from "./countriesReducer";

export default combineReducers({
    auth: authReducer,
    game: gameReducer,
    countries: countriesReducer
});