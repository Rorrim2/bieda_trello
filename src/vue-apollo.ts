import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import {setContext} from 'apollo-link-context';
import {getToken} from './main';


const httpLink = new HttpLink({
    // You should use an absolute URL here
    //TODO
     //uri: 'http://127.0.0.1:8000/graphql/',
    uri: 'https://bieda-trello-backend.herokuapp.com/graphql/',
})

const token_header = setContext( (_: any, {headers}: any) => {
    const jwt = getToken()
    console.debug(jwt);
    return {
        headers: {
            ...headers,
            authorization: jwt !== "" ? `Bearer ${jwt}` : null,

        }
    }
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: token_header.concat(httpLink),
    cache: new InMemoryCache({addTypename: false}),
    connectToDevTools: true,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

// Install the vue plugin
Vue.use(VueApollo)


export default apolloProvider;
