import gql from 'graphql-tag';

export const RevokeTokenMutation = gql`
    mutation RevokeToken($refresh_token: String!){
        revokeToken(refreshToken: $refresh_token){
            revoked
        }
    }`;

export const VerifyTokenMutation = gql`
    mutation VerifyToken($token: String!){
        verifyToken(token: $token){
            payload
        }
    }`;

export const RevokeJTIMutation = gql`
    mutation RevokeJTI($jti: String!, $userId: String!){
        revokejti(jti: $jti, userId: $userId){
            success
        }
    }`;
