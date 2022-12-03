import React, { Component } from 'react'; // DO I ALWAYS NEED THIS?
import './Todo.css';

// api key
var key = "f2c641-02b088-3b1c5b-e8fa56-7b3983";

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            completed: this.props.completed
        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleCheckbox(event) {
        var complete_id = event.target.parentNode.id;
        var item = { completed: true };
        // ajax call: PUT
        var putRequest = new XMLHttpRequest();
        putRequest.onreadystatechange = (data) => {
            console.log("currentTarget is", data.currentTarget);
            console.log(data.currentTarget.response);
            if (data.currentTarget.status == 200) {
                console.log("inside if")
                this.setState({ completed: true });
            } else {
                console.log("error setting completed");
            }
        };
        putRequest.open("PUT", "https://cse204.work/todos/" + complete_id, true);
        putRequest.setRequestHeader("content-type", "application/json");
        putRequest.setRequestHeader("x-api-key", key);
        putRequest.send(JSON.stringify(item));
    }

    render() {
        if (this.state.completed) {
            var check = <input onChange={this.handleCheckbox} id="complete" type="checkbox" checked="checked" value=""></input>
        }
        else {
            var check = <input onChange={this.handleCheckbox} id="complete" type="checkbox" value=""></input>
        }
        return (
            // USE THE HTML FROM ASSIGNMENT 8
            <div className="todo-item">
                {/* <h2>ToDo Items</h2> */}
                <br></br>
                <li id={this.props.id} className={this.handleCheckbox}>
                    {check}
                    <span id="text"> {this.props.text} </span>
                    <button type="button" className="delete" aria-label="deleteBtn" onClick={() => {this.props.delete(this.props.id)}}>
                        <span  aria-hidden="true" id="deleteBtn">&times;</span>
                    </button>
                </li>
            </div>
        );
    }
}
export default Todo;