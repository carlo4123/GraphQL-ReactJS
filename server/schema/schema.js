const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')

const {GraphQLObjectType,
     GraphQLString,
      GraphQLSchema,
      GraphQLID,
      GraphQLInt,
      GraphQLList,
      GraphQLNonNull
    } = graphql

// dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', auhtorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', auhtorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' , auhtorId: '3' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', auhtorId: '2' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', auhtorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', auhtorId: '3' },
// ];
// console.log(books)
// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type: AuthorType,
            description: "Author Name",
           resolve(parent,args){
          return Author.findById(parent.authorId)
            //   return authors.find(author => author.id === parent.auhtorId)
           }
        }
    })
})



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            description: "Author list of books",
            resolve(parent,args){
                // return books.filter(book => book.auhtorId === parent.id)
           return Book.find({authorId:parent.id})
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        books:{
            type:new GraphQLList(BookType),
            description: "List of  book",
            resolve(){
                // return books
                return Book.find({})
            }
        },
        book:{
            type:BookType,
            description: "a single book",
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
    
            //  return books.find(book => book.id  === args.id)
            return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            description: "a single author",
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
               return Author.findById(args.id)
            //  return authors.find(author => author.id  === args.id)
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            description: "List of  author",
            resolve(){
            //  return authors
            return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor:{
            type:AuthorType,
            description: "adding author",
            args:{
             name:  { type: new GraphQLNonNull(GraphQLString)},
             age:  { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                console.log("succesful inserted author")
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
               return author.save()
            }
        },
        addBook:{
            type:BookType,
            description:"adding Book",
            args:{
             name:  { type: new GraphQLNonNull(GraphQLString)},
             genre:  { type: new GraphQLNonNull(GraphQLString)},
             authorId:  { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                console.log("succesful inserted Book")
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})