const INITIAL_STATE = {
    level: 0,
    score: 0,
    location: null,
    numberOfLevel: 0,
    wrongAnswers: [],
    start: 0,
    time: 0
};

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CHOOSE_GAME_MODE":
            return { ...state, location: action.payload.location, numberOfLevel: action.payload.numberOfLevels };
        case "START_TIMER":
            return { ...state, start: action.payload };
        case "STOP_TIMER":
            return { ...state, time: action.payload };
        case "WINNING":
            return { ...state, level: action.payload.level += 1, score: action.payload.score += 1 };
        case "LOOSING":
            return { ...state, level: action.payload += 1 };
        case "WRONG_ANSWERS":
            return { ...state, wrongAnswers: [...state.wrongAnswers, action.payload] };
        case "RESET_STATE":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default gameReducer;