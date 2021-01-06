import gql from 'graphql-tag'

export const CreateListMutation = gql`
    mutation CreateNewList($board_id: String!, $position_on_board: Int!, $title: String!){
        createnewlist(boardId: $board_id, positionOnBoard: $position_on_board, title: $title){
            list{
                id
                title
                positionOnBoard
                isHidden
                cards{
                    id
                    cover
                    description
                    dueDate
                    title
                    positionInList
                }
            }
            success
        }
    }`;

export const HideListMutation = gql`
    mutation HideList($list_id: String!){
        hidelist(listId: $list_id){
            list{
                id
                isHidden
            }
        }
    }`;

export const UnhideListMutation = gql`
    mutation UnhideList($list_id: String!){
        unhidelist(listId: $list_id){
            list{
                id
                isHidden
            }
        }
    }`;

export const CopyListMutation = gql`
    mutation CopyList($listId: String!){
        copylist(listId: $listId){
            list{
                id
            }
        }
    }`;

export const MoveListMutation = gql`
    mutation MoveList($listId: String!, $newBoardId: String!, $newPositionOnBoard: Int!){
        movelist(listId: $listId, newBoardId: $newBoardId, newPositionOnBoard: $newPositionOnBoard){
            list{
                id
            }
        }
    }`;

export const UpdateListMutation = gql`
    mutation UpdateList($listId: String!, $positionOnBoard: Int, $title: String){
        updatelist(listId: $listId, positionOnBoard: $positionOnBoard, title: $title){
            list{
                id
                positionOnBoard
                title
            }
        }
    }`;