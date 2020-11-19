import {vm} from "@/main";
import {LogoutMutation, RefreshMutation} from "@/data_models/mutations";
import {Tokens} from "@/data_models/types";

export function refreshToken(tok:string, fn: any){
    vm.$apollo.mutate({
        mutation: RefreshMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        let tokens = <Tokens>value.data.refreshToken;
        fn(tokens);
    }).catch(error => {
        console.debug(error.graphQLErrors[0])
    });
}

export function logoutUser(tok: string, fn: any){
    vm.$apollo.mutate({
        mutation: LogoutMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        let logoutResult = value.data.logoutuser;
        fn(logoutResult);
    }).catch(error => {
        console.debug(error.graphQLErrors[0]);
    });
}