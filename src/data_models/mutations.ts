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
            success
            board{
                maker{
                    id
                    lastName
                    name
                }
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

export const PermanentlyDeleteMutation = gql`
    mutation PermanentlyDelete($board_id: String!){
        permanentlydelete(boardId: $board_id){
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
                board{
                    id
                }
            }
            success
        }
    }`;

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
                lastName
            }
        }
    }`;

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
