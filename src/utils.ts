import {vm} from "@/main";
import {RefreshMutation} from "@/data_models/mutations";

export function refreshToken(tok:string, fn: any){
    vm.$apollo.mutate({
        mutation: RefreshMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        fn(value);
    }).catch(error => {
        console.debug(error.graphQLErrors[0])
    });
}