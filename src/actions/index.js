import worldCountries from "../apis/worldCountries";
import { SIGN_IN, SIGN_OUT, WINNING, LOSING, CHOOSE_GAME_MODE, START_TIMER, STOP_TIMER, WRONG_ANSWERS, FETCH_COUNTRIES, RESET_COUNTRIES, RESET_GAME } from "./types";

export const resetGame = () => {
    return {
        type: RESET_GAME
    };
};

export const resetCountries = () => {
    return {
        type: RESET_COUNTRIES
    };
};

export const signIn = (userId, name) => {
    return {
        type: SIGN_IN,
        payload: {
            userId,
            name
        }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const winning = (level, score) => {
    return {
        type: WINNING,
        payload: {
            level,
            score
        }
    };
};

export const losing = (level) => {
    return {
        type: LOSING,
        payload: level
    };
};

export const chooseGameMode = (location, numberOfLevels) => {
    return {
        type: CHOOSE_GAME_MODE,
        payload: {
            location,
            numberOfLevels
        }
    };
};

export const startTimer = (beginning) => {
    return {
        type: START_TIMER,
        payload: beginning
    };
};

export const stopTimer = (timer) => {
    return {
        type: STOP_TIMER,
        payload: timer
    };
};

export const wrongAnswers = (name, flag) => {
    return {
        type: WRONG_ANSWERS,
        payload: {
            name,
            flag
        }
    };
};

export const fetchCountriesData = (location) => async (dispatch, getState) => {
    let url = "";
    location === "World" ? url = "/all" : url = `/region/${location}`;

    const { data } = await worldCountries.get(url);

    const numberOfLevels = getState().game.numberOfLevel;
    const namePattern = [];
    const srcPattern = [];
    const pattern = [];

    while (pattern.length < numberOfLevels) {
        const random = Math.floor(Math.random() * data.length);
        pattern.indexOf(random) === -1 && pattern.push(random);
    }

    for (var i = 0; i < numberOfLevels; i++) {
        namePattern.push(data[pattern[i]].name);
    }

    for (var x = 0; x < numberOfLevels; x++) {
        srcPattern.push(data[pattern[x]].flag);
    }

    dispatch({ type: FETCH_COUNTRIES, payload: { data, namePattern, srcPattern } });
};