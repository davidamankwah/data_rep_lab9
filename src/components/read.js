import React from "react";
import { Books } from "./books"; //imported books
import axios from "axios";

export class Read extends React.Component{

    //constructor
    constructor(){
        super()
        this.ReloadData = this.ReloadData.bind(this); //bind event
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/books')
        .then((response)=>{
            this.setState({books:response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    //a method to refresh data from the server
    ReloadData() {
        axios.get('http://localhost:4000/api/books')
        .then((response)=>{
            this.setState({books:response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    state = {
        books:[ ]
    }
    
    render(){
        return(
            <div>
                <h3>Hello from my Read component!</h3>

                {/* pass ReloadData method */}
                <Books books={this.state.books} ReloadData={this.ReloadData}></Books>
            </div>
        );
    }
}