import { FETCH_ALL_GAMES } from "../actions/types";

const allGamesReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_GAMES:
            return { ...state, allGames: action.payload };
        default:
            return state;
    }
};

export default allGamesReducer;