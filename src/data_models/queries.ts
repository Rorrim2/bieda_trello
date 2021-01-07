import gql from 'graphql-tag'

export const ActivityQuery = gql`
    query Activity($id: String){
        activity(id: $id){
            id
            content
            createdOn
            type
        }
    }
`;

export const ActivitysQuery = gql`
    query {
        activitys{
            id
            content
            createdOn
            type
        }
    }
`;

export const ActivityByUserQuery = gql`
    query ActivityByUser($userId: String) {
        activitysByUser(userId: $userId) {
            id
            content
            createdOn
            type
            user {
                name
                lastName
            }
        }
    }
`;

export const ActivityByCardQuery = gql`
    query ActivityByCard($cardId: String) {
        activitysByCard(cardId: $cardId) {
            id
            content
            createdOn
            type
            user {
                name
                lastName
            }
        }
    }
`;

export const ActivityByBoardQuery = gql`
  query ActivitysByBoard($boardId: String) {
      activitysByBoard(boardId: $boardId) {
          id
          content
          createdOn
          type
          user {
              name
              lastName
          }
      }
  }
`;

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

export const LabelQuery = gql`
    query Label($id: String) {
        label(id: $id) {
            id
            name
            color
        }
    }
`;

export const LabelsQuery = gql`
    query Labels($boardId: String) {
        labels(boardId: $boardId) {
            id
            name
            color
        }
    }
`;

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
                activities {
                    id
                    content
                    createdOn
                    type
                    user {
                        id
                        name
                        lastName
                    }
                }
            }
        }
    }`;

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
