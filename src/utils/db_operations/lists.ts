import {
    ErrorCallback,
    MutationCallback,
    QueryCallback,
    SingleListEntry,
    SingleListModel, SingleListPreview,
    SingleListUpdate
} from "@/data_models/types";
import {apolloClient} from "@/vue-apollo";
import {ListQuery} from "@/data_models/queries";
import {CreateListMutation, UpdateListMutation} from "@/data_models/mutations/lists";

export function fetchList(list_id:string, onResult:QueryCallback<SingleListModel>,
                          onError: ErrorCallback){
    console.debug(`ID of list: ${list_id}`);

    apolloClient.query({
        query: ListQuery,
        variables:{
            id:list_id,
        }
    }).then(value => {
        onResult(value.data.list);
    }).catch(reason => {
        onError(reason);
    })
}

export function createList(data: SingleListEntry, onResult: MutationCallback<{list:SingleListModel, success:boolean}>,
                           onError:ErrorCallback){
    apolloClient.mutate({
        mutation: CreateListMutation,
        variables: {
            board_id: data.boardId,
            position_on_board: data.positionOnBoard,
            title: data.title
        }
    }).then(value => {
        onResult(value.data.createnewlist);
    }).catch(reason => {
        onError(reason);
    });
}

export function updatePositionOfList(list: SingleListPreview, onResult: MutationCallback<SingleListUpdate>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: UpdateListMutation,
        variables: {
            listId:list.id,
            positionOnBoard:list.positionOnBoard
        }
    }).then(value => {
        onResult(value.data.updatelist.list);
    }).catch(reason => {
        onError(reason);
    });
}

export function updateTitleOfList(listId: string, title: string,  onResult: MutationCallback<SingleListUpdate>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: UpdateListMutation,
        variables: {
            listId:listId,
            title:title
        }
    }).then(value => {
        onResult(<SingleListUpdate> value.data.updatelist.list);
    }).catch(reason => {
        onError(reason);
    });
}