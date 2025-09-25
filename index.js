import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema.js";
import resolvers from "./data/resolvers.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use('/graphql', graphqlHTTP({
    schema: schema, // schema
    rootValue: resolvers, // resolver
    graphiql: true, // enable GraphiQL UI
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});