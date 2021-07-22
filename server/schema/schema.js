const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require('graphql');

const books = [
  { name: "算法导论", genre: "计算机科学", id: "1" },
  { name: "人性的弱点", genre: "社交", id: "2" },
  { name: "明朝那些事儿", genre: "历史", id: "3" }
]

// add type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
})

// query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // 当 query id 传来 number 时会报错，这时可以使用 GraphQLID 来解决此问题。
      resolve(parent, args, bb) {
        // 从哪里获取数据，比如从数据库获或其它来源
        console.log('PXX', parent, args)
        return _.find(books, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
