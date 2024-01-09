    import { UPDATE_CHAT } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CHAT:
            return {
                ...state,
                messages: [...action.messages]
            };
        default:
            return state;
    }
}