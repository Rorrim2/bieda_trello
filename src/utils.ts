import {vm} from "@/main";
import {RefreshMutation} from "@/data_models/mutations";
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