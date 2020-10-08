import React, { useState } from 'react'
import {graphql} from 'react-apollo'
import {getBookQuery} from '../queries/queries'


//components
import BookDetails from './BookDetails'

function BookList(props){

    const [bookId,setBookId] = useState(null)
function handleClick(event){
    console.log(event.target.getAttribute("id"))
    const id = event.target.getAttribute("id")
  
    setBookId(id)
}

function displayBooks(){
    const data = props.data
  

    if(data.loading){
        return  <div>Loading books</div>
    }
    else{
        return data.books.map((book) => {
            return (
                
                 <li key={book.id} id={ book.id} onClick={handleClick}>{book.name}</li>
                 
                 )
            
        })
    }

}

 
 
    return(
        <div>
            <ul id="book-list">
             {displayBooks()}
            </ul>
         <BookDetails bookId={bookId}/>
        </div>
    )
}

export default  graphql(getBookQuery)(BookList)