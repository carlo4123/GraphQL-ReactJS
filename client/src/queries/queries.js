import {gql} from 'apollo-boost'

const getBookQuery = gql`
{
    books{
        name
        id
    }
}
`

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}`

const getSingleBookQuery = gql`

query($id: ID!){
    book(id: $id){
        id
        name
        genre
        author{
            id
            name
            books{
                name
                id
            }
        }
    }
}
`


const addBookMutation = gql`
    mutation ($name: String!, $genre: String!, $authorId: String!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`
export {getAuthorsQuery,getBookQuery,addBookMutation,getSingleBookQuery}