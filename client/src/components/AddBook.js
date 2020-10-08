import React,{useState} from 'react'
import {graphql} from 'react-apollo'
import * as compose from 'lodash.flowright'
import {getAuthorsQuery , addBookMutation,getBookQuery} from '../queries/queries'

function AddBook(props){
 
    const [input, setInput] = useState({
        name: '',
        genre: '',
        authorId: ''
    })

    function handleChange(event){
        const {name, value} = event.target
        setInput((prevValue)=>{
            
            return {
                ...prevValue,
                [name]:value
            }
        })
    }

   function submitForm(e){
    //    console.log(input)
       const addBook = props.addBookMutation
     addBook({
         variables:{
             name: input.name,
             genre: input.genre,
             authorId: input.authorId
         },
         refetchQueries: [{query: getBookQuery} ]
     })
       e.preventDefault()
   }
    const data = props.getAuthorsQuery
    function displayAuthor(){
     

        if(data.loading){
            return (<option>Loading Authors...</option>)
        }else{
            return data.authors.map((author,index)=>{
                return(
                    <option key={index} value={author.id}>{author.name}</option>
                )
            })
        }
    }

 
 
    return(
        <form id="add-book" onSubmit={submitForm}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" name="name" onChange={handleChange} />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" name="genre" onChange={handleChange} />
        </div>
        <div className="field">
            <label>Author:</label>
            <select name="authorId" onChange={handleChange}>
                <option>Select author</option>
                {displayAuthor()}
            </select>
        </div>
        <button>+</button>

    </form>
    )
}

export default compose(
graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook)