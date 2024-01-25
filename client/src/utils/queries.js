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

export const GET_CHAT_BY_ID = gql`
    query GET_CHAT_BY_ID($roomId: ID!) {
        getChatById(_id: $roomId) {
            _id
            room
            messages {
                _id
                message
                username
            }
        }
    }

`