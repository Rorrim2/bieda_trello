import {AuthResult, Credentials, ErrorCallback, MutationCallback, RegisterCredentials, User} from "@/data_models/types";
import {apolloClient} from "@/vue-apollo";
import {EditProfile, LoginMutation, LogoutMutation, RegisterMutation} from "@/data_models/mutations/users";

export function loginUser(credentials: Credentials, onResult: MutationCallback<AuthResult>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: LoginMutation,
        variables: {
            email: credentials.email,
            password: credentials.password
        }
    }).then((data) => {
        onResult(data.data.loginuser)
    }).catch((error) => {
        onError(error);
    });
}

export function registerUser(credentials: RegisterCredentials, onResult: MutationCallback<AuthResult>, onError:ErrorCallback){
    apolloClient.mutate({
        mutation: RegisterMutation,
        variables: {
            email: credentials.email,
            password: credentials.password,
            name: credentials.name,
            lastName: credentials.lastName
        }
    }).then((value) => {
        onResult(value.data.registeruser);
    }).catch((error) => {
        onError(error);
    });
}

export function logoutUser(tok: string, onResult: MutationCallback<{
    success: boolean;
}>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: LogoutMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        onResult(value.data.logoutuser);
    }).catch(error => {
        console.debug(error.message);
        console.debug(error.graphQLErrors??[0]);
        onError(error);
    });
}

export function editProfile(data:User,
                            onResult: MutationCallback<{user:User}>,
                            onError: ErrorCallback) {
    apolloClient.mutate({
        mutation:EditProfile,
        variables:{
            userId:data.id,
            email:data.email,
            name:data.name,
            lastName:data.lastName,
        }
    }).then(value => {
        onResult(value.data);
    }).catch(reason => {
        onError(reason);
    })
}