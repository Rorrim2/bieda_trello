import gql from 'graphql-tag'

export const LoginMutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginuser(email: $email, password: $password) {
            user {
                id
                name
                lastName
            }
            success
            token
            refreshToken
        }
    }`;

export const LogoutMutation = gql`
    mutation LogoutUser($refreshToken: String!){
        logoutuser(refreshToken: $refreshToken){
            success
        }
    }`;

export const RefreshMutation = gql`
    mutation RefreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            token
            refreshToken    
            payload
            refreshExpiresIn
        }
    }`;

export const RegisterMutation = gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!, $lastName: String!) {
        registeruser(email: $email, password: $password, name: $name, lastName: $lastName) {
            user {
                id
                name
                lastName
            }
            success
            token
            refreshToken
        }
    }`;

export const CreateNewBoardMutation = gql`
    mutation CreateNewBoard($title: String!) {
        createnewboard(title: $title){
            board{
                background
                description
                id
                isClosed
                isVisible
                users {
                    id
                    lastName
                    name
                }
                title
                lists {
                    id
                    cards{
                        id
                    }
                }
            }
        }
    }`;

export const CloseBoardMutation = gql`
    mutation CloseBoard($board_id: String!){
        closeBoard(boardId: $board_id){
            board{
                id
            }
        }
    }`;

export const ReopenBoardMutation = gql`
    mutation ReopenBoard($board_id: String!){
        reopenBoard(boardId: $board_id){
            board{
                id
            }
            success
        }
    }`;

export const PermanentlyDeleteMutation = gql`
    mutation PermanentlyDelete($board_id: String!){
        permanentlydelete(boardId: $board_id){
            board{
                id
            }
            success
        }
    }`;