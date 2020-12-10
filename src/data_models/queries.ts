import gql from 'graphql-tag'

export const UsersQuery = gql`
    query {
        users{
            id
            name
            lastName
        }
    }`;

export const UserQuery = gql`
    query User($id: String, $email: String) {
        user(id: $id, email: $email){
            id
            name
            lastName
        }
    }`;

export const BoardsQuery = gql`
    query {
        boards{
            id
            title
            background
            isClosed
            isVisible
        }
    }`;

export const BoardQuery = gql`
    query Board($id: String){
        board(id: $id){
            id
            title
            description
            background
            isClosed
            isVisible
            maker{
                id
                name
                lastName
            }
            admins{
                id
                lastName
                name
            }
            users {
                id
                lastName
                name
            }
            lists{
                id
            }
        }
    }`;

export const CardsQuery = gql`
    query{
        cards{
            archived
            cover
            description
            dueDate
            id
            positionInList
            title
            list{
                id
            }
        }
    }`;

export const CardQuery = gql`
    query Card($id: String){
        card(id: $id){
            archived
            cover
            description
            dueDate
            id
            positionInList
            title
            list{
                id
            }
        }
    }`;

export const ListsQuery = gql`
    query{
        lists{
            id
            isHidden
            positionOnBoard
            title
            cards{
                archived
                cover
                description
                dueDate
                id
                positionInList
                title
            }
        }
    }`;

export const ListQuery = gql`
    query List($id: String){
        list(id: $id){
            id
            isHidden
            positionOnBoard
            title
            cards{
                archived
                cover
                description
                dueDate
                id
                positionInList
                title
            }
        }
    }`;