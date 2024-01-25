import { UPDATE_CHAT, UPDATE_ROOM, UPDATE_NAME } from "./actions";

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
        case UPDATE_NAME:
            console.log('In reducer', action.username)
            return {
                ...state,
                username: action.username
            }
        default:
            return state;
    }
}