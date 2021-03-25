import { FETCH_COUNTRIES, RESET_STATE } from "../actions/types";

const INITIAL_STATE = {
    allData: {},
    namePattern: [],
    srcPattern: []
};

const countriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return { ...state, allData: action.payload.data, namePattern: action.payload.namePattern, srcPattern: action.payload.srcPattern };
        case RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default countriesReducer;