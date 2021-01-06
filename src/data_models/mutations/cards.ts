import gql from 'graphql-tag'

export const CreateCardMutation = gql`
    mutation CreateCard($list_id: String!, $title: String!){
        createcard(listId: $list_id, title: $title){
            card{
                id
                cover
                description
                dueDate
                title
                positionInList
            }
            success
        }
    }`;

export const EditCardMutation = gql`
    mutation EditCard($archived: Boolean, $card_id: String!, $cover: String, $description: String, $dueDate: String, $list_id: String, $positionInList: Int, $title: String){
        editcard(archived: $archived, cardId: $card_id, cover: $cover, description: $description, dueDate: $dueDate, listId: $list_id, positionInList: $positionInList, title: $title){
            card{
                id
                cover
                description
                dueDate
                title
                positionInList
                list {
                    id
                    board{
                        id
                    }
                }
            }
            success
        }
    }`;

export const DeleteCardMutation = gql`
    mutation DeleteCard($cardId: String!){
        deletecard(cardId: $cardId){
            success
            card{
                id
            }
        }
    }`;
