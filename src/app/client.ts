import { ApolloClient, createNetworkInterface } from 'apollo-client';
// import { addGraphQLSubscriptions, SubscriptionClient } from 'subscriptions-transport-ws';


// const wsClient = new SubscriptionClient('wss://subscriptions.us-west-2.graph.cool/v1/cj79ruij201pj0107d4v0pnsl', {
//     reconnect: true
// });

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj79ruij201pj0107d4v0pnsl' });
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        // get the authentication token from local storage if it exists
        if (localStorage.getItem('graphcoolToken')) {
            req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`;
        }
        next();
    },
}]);
// const networkInterfaceWithSubs = addGraphQLSubscriptions(networkInterface, wsClient);


const client = new ApolloClient({
    networkInterface //: networkInterfaceWithSubs
});

export function provideClient(): ApolloClient {
    return client;
}
