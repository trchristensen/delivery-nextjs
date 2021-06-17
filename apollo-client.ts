import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const client = new ApolloClient<NormalizedCacheObject>({
//   uri: "http://localhost:1337/graphql",
//   cache: new InMemoryCache(),
// });


const httpLink = createHttpLink({
  uri: "http://localhost:1337/graphql"
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient<NormalizedCacheObject>({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  
});

export default client;


