import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const QUERY_USER_BY_ID = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      nationality
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;
export function Display() {
  //use state declerations
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");

  // graphql queries
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS); // get all user
  const [fetchUser, { data: indData, error: indError }] =
    useLazyQuery(QUERY_USER_BY_ID); // get user by id

  // graphql mutations
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading</h1>;
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name.."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username.."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age.."
          onChange={(event) => {
            setAge(Number(event.target.value));
          }}
        />
        <input
          type="text"
          placeholder="Nationality.."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  age,
                  username,
                  nationality,
                },
              },
            });
            refetch();
          }}
        >
          create User
        </button>
      </div>
      {data?.users &&
        data.users.map((user) => {
          return (
            <div>
              <p>id = {user.id}</p>
              <p>Name = {user.name}</p>
              <p>Age = {user.age}</p>
              <p>Username = {user.username}</p>
              <hr />
            </div>
          );
        })}
      <div>
        <input
          type="number"
          placeholder="User id"
          value={id}
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchUser({
              variables: {
                id: id,
              },
            });
          }}
        >
          Fetch Data
        </button>
        {indError && <h1>There was an Error !!</h1>}

        <div>
          {indData && (
            <div>
              <p>name: {indData.user.name}</p>
              <p>nationality: {indData.user.nationality}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
