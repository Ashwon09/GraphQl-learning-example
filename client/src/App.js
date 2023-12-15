import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Display } from "./displayData";
import { useState } from "react";
import { DisplayMovies } from "./displayMovies";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  const [tab, setTab] = useState(true);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <button onClick={() => setTab(!tab)}>Switch tabs</button>
        {tab ? (
          <div>
            <h1>List of Users</h1>
            <Display />
          </div>
        ) : (
          <div>
            <DisplayMovies />
          </div>
        )}
      </div>
      ;
    </ApolloProvider>
  );
}

export default App;
