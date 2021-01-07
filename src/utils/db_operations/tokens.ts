import {empty, ErrorCallback, MutationCallback, Payload, StorageDescriptor, Tokens} from "@/data_models/types";
import {getFromStorage, removeFromStorage} from "@/store";
import {apolloClient} from "@/vue-apollo";
import {RevokeJTIMutation, VerifyTokenMutation} from "@/data_models/mutations/tokens";
import {RefreshMutation} from "@/data_models/mutations/users";

export function refreshToken(tok:string, onResult: MutationCallback<Tokens>, onError: ErrorCallback){
    if(!tok || tok === "" || tok === empty) return;

    let jti = getFromStorage("jti", StorageDescriptor.local) as string;
    let user_id = getFromStorage("active_user", StorageDescriptor.local).id as string;

    apolloClient.mutate({
        mutation:RevokeJTIMutation,
        variables:{
            jti:jti,
            userId:user_id
        },

    }).then(value => {
        console.log(value.data.revokejti.success);
        if (value.data.success == true){
            removeFromStorage("jti", StorageDescriptor.local);
        }
    }).catch(error=>{
        console.debug(error.graphQLErrors[0])
    })

    apolloClient.mutate({
        mutation: RefreshMutation,
        variables: {
            refreshToken: tok
        },

    }).then(value => {
        onResult(value.data.refreshToken);
    }).catch(error => {
        console.debug(error.message);
        console.debug(error.graphQLErrors??[0]);
        onError(error);
    });
}

export function verifyToken(tkn: string, onResult: MutationCallback<Payload>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: VerifyTokenMutation,
        variables:{
            token: tkn,
        }
    }).then(value => {
        onResult(value.data.verifyToken);
    }).catch(error => {
        onError(error);
    })
}