import {
    BoardModel,
    BoardPreview,
    CloseBoardNode,
    ErrorCallback,
    MutationCallback,
    QueryCallback
} from "@/data_models/types";
import {apolloClient} from "@/vue-apollo";
import {BoardQuery, BoardsQuery} from "@/data_models/queries";
import {
    ChangeBoardVisibilityMutation,
    CloseBoardMutation,
    CreateNewBoardMutation,
    UpdateBoardMutation
} from "@/data_models/mutations/boards";

export function fetchBoard(board_id: string, onResult:QueryCallback<BoardModel>,
                           onError: ErrorCallback){
    console.debug(`ID of BOARD: ${board_id}`);

    apolloClient.query({
        query: BoardQuery,
        variables: {
            id:board_id
        }
    }).then(value => {
        onResult(value.data.board);
    }).catch(reason => {
        onError(reason);
    })
}

export function createBoard(data:{background:string, title:string},
                            onResult: MutationCallback<{board:BoardPreview, success:boolean}>,
                            onError: ErrorCallback){
    console.debug(`bg: ${data.background}`);
    apolloClient.mutate({
        mutation:CreateNewBoardMutation,
        variables:{
            background:data.background,
            title:data.title
        }

    }).then(value => {
        onResult(value.data.createnewboard);
    }).catch(reason => {
        onError(reason);
    })
}

export function fetchBoards(onResult:QueryCallback<Array<BoardPreview>>,
                            onError: ErrorCallback) {
    apolloClient.query({
        query:BoardsQuery
    }).then(value => {
        onResult(value.data.boards);
    }).catch(reason => {
        onError(reason);
    });
}

export function closeBoard(boardId: string, onResult:QueryCallback<CloseBoardNode>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation:CloseBoardMutation,
        variables:{
            board_id:boardId
        }
    }).then(value => {
        onResult(value.data.closeBoard.board);
    }).catch(reason => {
        onError(reason);
    });
}

export function updateBoard(board: BoardModel, onResult:QueryCallback<BoardModel>, onError:ErrorCallback){
    apolloClient.mutate({
        mutation:UpdateBoardMutation,
        variables: {
            boardId: board.id,
            background: board.background,
            description: board.description,
            title: board.title
        }
    }).then(value => {
        onResult(value.data.updateboard.board);
    }).catch(reason => {
        onError(reason);
    })
}

export function changeBoardVisibility(boardId: string, visibility: boolean,onResult:QueryCallback<BoardModel>, onError:ErrorCallback) {
    apolloClient.mutate({
        mutation: ChangeBoardVisibilityMutation,
        variables: {
            boardId: boardId,
            visibility: visibility
        }
    }).then(value => {
        onResult(value.data.changeboardvisibility.board);
    }).catch(reason => {
        onError(reason);
    })
}
