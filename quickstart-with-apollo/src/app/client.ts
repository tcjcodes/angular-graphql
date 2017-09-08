import { ApolloClient, createNetworkInterface } from 'apollo-client';

// Paste your endpoint for the Simple API here.
// Info: https://github.com/graphcool-examples/angular-apollo-instagram-example#2-create-graphql-api-with-graphcool
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

const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
    return client;
}
