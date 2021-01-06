import gql from 'graphql-tag'

export const CreateNewBoardMutation = gql`
    mutation CreateNewBoard( $background: String, $title: String!) {
        createnewboard(backgroundUrl: $background, title: $title){
            success
            board{
                maker{
                    id
                }
                background
                id
                admins{
                    id
                }
                isClosed
                isVisible
                users {
                    id
                }
                title
            }
        }
    }`;

export const CloseBoardMutation = gql`
    mutation CloseBoard($board_id: String!){
        closeBoard(boardId: $board_id){
            board{
                id
                isClosed
            }
        }
    }`;

export const ReopenBoardMutation = gql`
    mutation ReopenBoard($board_id: String!){
        reopenBoard(boardId: $board_id){
            board{
                id
                isClosed
            }
            success
        }
    }`;

export const DeleteBoardMutation = gql`
    mutation DeleteBoard($board_id: String!){
        deleteboard(boardId: $board_id){
            board{
                id
            }
            success
        }
    }`;

export const AddUserMutation = gql`
    mutation AddUser($board_id: String!, $user_id: String!){
        adduser(boardId: $board_id, userId: $user_id){
            board{
                id
                users{
                    id
                    lastName
                    name
                }
            }
            success
        }
    }`;

export const AddAdminMutation = gql`
    mutation AddAdmin($board_id: String!, $user_id: String!){
        addadmin(boardId: $board_id, adminId: $user_id){
            board{
                id
                admins{
                    id
                    lastName
                    name
                }
            }
            success
        }
    }`;

export const UpdateBoardMutation = gql`
    mutation UpdateBoard($background: String, $boardId: String!, $description: String, $title: String){
        updateboard(background: $background, boardId: $boardId, description: $description, title: $title){
            board{
                id
            }
        }
    }`;
