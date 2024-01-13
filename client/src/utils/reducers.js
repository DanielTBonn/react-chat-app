import { UPDATE_CHAT, UPDATE_ROOM } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CHAT:
            return {
                ...state,
                messages: [...action.messages]
            };
        case UPDATE_ROOM: 
            return {
                ...state,
                room: action.room
            };
        default:
            return state;
    }
}