const { UserList, MovieList } = require("../data");
const _ = require("lodash");

const resolvers = {
  Query: {
    //User
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    //Movie
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUser: (parent, args) => {
      const userToUpdate = args.input;
      let userToReturn;
      UserList.forEach((user) => {
        if (user.id === Number(userToUpdate.id)) {
          user.name = userToUpdate?.name || user.name;
          user.username = userToUpdate?.username || user.username;
          user.nationality = userToUpdate?.nationality || user.nationality;
          user.age = userToUpdate?.age || user.age;
          userToReturn = user;
        }
      });
      return userToReturn;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      _.remove(UserList, (user) => user.id === Number(id));
      return user;
    },
  },
  User: {
    favouriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
};

module.exports = { resolvers };
