const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = require('graphql');

const books = [
  { name: "算法导论", genre: "计算机科学", id: "1" },
  { name: "人性的弱点", genre: "社交", id: "2" },
  { name: "明朝那些事儿", genre: "历史", id: "3" }
]
const authors = [
  { name: 'uzi', age: 26, id: '1' },
  { name: 'jacklove', age: 23, id: '2' },
  { name: 'xiaohu', age: 25, id: '3' },
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

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
})

// query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // 当 query id 传来 number 时会报错，这时可以使用 GraphQLID 来解决此问题。
      resolve(parent, args) {
        // 从哪里获取数据，比如从数据库获或其它来源
        console.log('PXX', parent, args)
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
