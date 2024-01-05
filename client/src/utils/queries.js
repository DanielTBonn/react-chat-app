import { gql } from '@apollo/client';

export const GET_CHAT = gql`
    query GET_CHAT($room: String!) {
        getChat(room: $room) {
            _id
            room
            messages {
                _id
                message
            }
        }
    }

`