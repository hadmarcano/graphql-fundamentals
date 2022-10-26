"use strict";
require("dotenv").config();
// require("./libs/db");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");

const app = express();
const typeDefs = readFileSync(
  join(__dirname, "libs", "schema.graphql"),
  "utf-8"
);
const resolvers = require("./libs/resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Configurando nuestro servidor GraphQL
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("App is lintening on port 4000");
});
