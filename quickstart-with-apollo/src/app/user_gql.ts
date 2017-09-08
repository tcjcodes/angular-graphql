import gql from 'graphql-tag';

export const createUser = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, name: $name) {
      id
    }
  }
`;

export const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`;

export const userQuery = gql`
  query {
    user {
      id
    }
  }
`;


// export default graphql(createUser, {name: 'createUser'})(
//     graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(
//         graphql(signinUser, {name: 'signinUser'})(
//             withRouter(CreateUser))
//     )
// )