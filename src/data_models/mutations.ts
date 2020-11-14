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

export const RefreshMutation = gql`
    mutation RefreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            token
            refreshToken
        }
    }`;