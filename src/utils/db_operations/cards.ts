import {ErrorCallback, MutationCallback, SingleCardModel} from "@/data_models/types";
import {apolloClient} from "@/vue-apollo";
import {CreateCardMutation} from "@/data_models/mutations/cards";

export function createCard(data: {list_id:string, title:string},
                           onResult: MutationCallback<{card:SingleCardModel, success:boolean}>,
                           onError:ErrorCallback) {
    apolloClient.mutate({
        mutation: CreateCardMutation,
        variables: {
            list_id: data.list_id,
            title: data.title,
        }
    }).then(value => {onResult(value.data.createcard);
    }).catch(reason => {onError(reason);
    });
}