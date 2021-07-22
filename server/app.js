const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // 在 server 中开启 graphql 查询， 推荐 brew install --cask graphql-playground 可视化调试工具。
}))

app.listen(8888, () => {
  console.log('PX | now listening for requests on port 8888')
})
