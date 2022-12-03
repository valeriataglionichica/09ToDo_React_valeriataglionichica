import React,{Component} from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render(){
        return(
            <div id="myTodoForm">
                <h2>New ToDo Item</h2> 
                
                    <input value={this.props.userInput} onChange={this.props.handleTextChange} type="text" className="input" id="input"></input>
                    <button id="addBtn" onClick={()=>{this.props.handleAddButton(this.props)}}>Add</button>
                    {/* <button onClick={this.props.handleDeleteButton} id="deleteBtn">Delete</button> */}
                    {/* <input onChange={this.handleCheckbox} id="complete" type="checkbox"></input> */}
                
            </div>
        );
    }
}
export default NewTodo;