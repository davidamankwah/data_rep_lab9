//imports
import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button' //import buttom for styling
import axios from "axios"; //import to use axios
export class BookItem extends React.Component {

    // constructor
    constructor() {
        super();

        //binding event
        this.DeleteBook = this.DeleteBook.bind(this);
    }

    // delete book function
    //invoked when delete button clicked
    DeleteBook(e) {
        e.preventDefault();
    
        //make a HTTP Request with Delete method and pass as part of the
        //url
        axios.delete('http://localhost:4000/api/book/' + this.props.book._id)
            .then((res) => {
                this.props.ReloadData(); //invoke methode to refresh 
            })
            .catch()
    }

    render() {
        return (
            <div>
                {/* <h4>{this.props.book.title}</h4>
        <img src={this.props.book.thumbnailUrl}></img>
                <h6>{this.props.book.authors[0]}</h6> */}

                <Card>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.book.cover}></img>
                            <footer >
                                {this.props.book.author}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/* link allows you to edit a book.*/}
                    {/* _id is identify each book.  */}
                    {/* Send you where can to edit book */}
                    {/* like a button to click */}
                    <Link to={'/edit/' + this.props.book._id} className="btn btn-primary">Edit</Link>

                    {/* red button that allows you to delete */}
                    {/* invoke DeleteBook function when clicked */}
                    {/* use onClick event */}
                    <Button variant="danger" onClick={this.DeleteBook}>Delete</Button>
                </Card>
            </div>
        );
    }
}