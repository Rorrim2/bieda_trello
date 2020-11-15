import gql from 'graphql-tag'

export const UsersQuery = gql`
    query {
        users{
            id
            name
            lastName
        }
    }
`;