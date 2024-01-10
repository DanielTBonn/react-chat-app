import { gql } from '@apollo/client'


export const CREATE_DBCHAT = gql`
    mutation CREATE_DBCHAT($room: String!) {
        createChat(room: $room) {
            _id
            room
            messages {
                _id
                message
            }
        }
    }
`

export const UPDATE_DBCHAT = gql`
    mutation UPDATE_DBCHAT($room: String!, $message: String!) {
        updateChat(room: $room, message: $message ) {
            _id
            room
            messages {
                _id
                message
            }
        }
    }
`

export const DELETE_DBCHAT = gql`
    mutation DELETE_DBCHAT($room: String!) {
        deleteChat(room: $room) {
            _id
            room
            messages {
                _id
                message
            }
        }
    }
`