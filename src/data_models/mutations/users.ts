import gql from 'graphql-tag'

export const ForgetPasswordMutation = gql`
    mutation ForgetPasswordRequest($email: String!){
        forgetpasswordrequest(email: $email){
            forgetToken
        }
    }`;

export const SetNewPasswordMutation = gql`
    mutation SetNewPasswordAfterReset($forget_token: String!, $new_password: String!){
        setnewpasswordaftereset(forgetToken: $forget_token, newPassword: $new_password){
            refreshToken
            success
            token
            user{
                id
                name
                email
                lastName
            }
        }
    }`;

export const LoginMutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginuser(email: $email, password: $password) {
            user {
                id
                name
                email
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
            refreshExpiresIn
        }
    }`;

export const RegisterMutation = gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!, $lastName: String!) {
        registeruser(email: $email, password: $password, name: $name, lastName: $lastName) {
            user {
                id
                name
                email
                lastName
            }
            success
            token
            refreshToken
        }
    }`;

export const EditProfile = gql`
    mutation EditProfile($userId: String!, $email: String, $name: String, $lastName: String){
        editprofile(userId: $userId, email: $email, name: $name, lastName: $lastName) {
            user{
                id
                name
                lastName
                email
            }
        }
    }`;
