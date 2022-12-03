// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import NewTodo from './NewTodo';
import Todo from './Todo';

// api key
var key = "f2c641-02b088-3b1c5b-e8fa56-7b3983";

class App extends Component {
  // DO I USE PROPS IN CONSTRUCTOR AND SUPER CALL HERE?
  constructor(props) {
    super(props)
    this.state = {
      userInput: '', // SHOULD IT BE ""?
      todos: [
        
      ]
    }
    // THIS MAY GO AFTER }??
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // IS THIS THE SAME AS COMPONENTDIDMOUND???
  // handle changes to userInput text to overriding user input property in our app state
  handleTextChange(event) {
    this.setState({
      userInput: event.target.value
    })
  }

  // handle add button
  handleAddButton() {
    // event.preventDefault();
    const newToDo = {
      text: this.state.userInput
    }
    // make ajax call: POST
    let createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = (data) => {
      if (data.currentTarget.status == 200) {
        var added = JSON.parse(data.currentTarget.responseText);
        this.setState({
          todos: [...this.state.todos, added]
        })
        this.setState({
          userInput: ''
        })
      } else {
        console.log("error adding new todo");
      }
    };
    createRequest.open("POST", "https://cse204.work/todos", true);
    createRequest.setRequestHeader("content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", key);
    createRequest.send(JSON.stringify(newToDo));
  }

  // handle delete button
  handleDeleteButton(id) {
    console.log("delete button", id);
    var delete_id = id;
    // make ajax call: DELETE
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.onreadystatechange = (data) => {
      if (data.currentTarget.status == 200) {
        var leftover = this.state.todos.filter((item) => {
          if (item.id !== delete_id) {
            return item;
          }
        });
        this.setState({ todos: leftover });
      }
      else {
        console.log("Error deleting todo");
      }
    }
    deleteRequest.open("DELETE", "https://cse204.work/todos/" + delete_id, true);
    deleteRequest.setRequestHeader("content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", key);
    deleteRequest.send();
  }

  // handleCheckbox(event){}

  // createToDo(){
  // make ajax call: PUT
  // reference this.state.userInput (which is inputText right?)
  // update the array of todo items
  // }

  componentDidMount() {
    // make ajax call: GET
    console.log("component did mount");
    let getRequest = new XMLHttpRequest();
    getRequest.onreadystatechange = (data) => {
      // console.log("onreadystatechange ran");
      // console.log("data is", data);
      // console.log("this is", this);
      if ((data.currentTarget.readyState == 4) && (data.currentTarget.status == 200)) {
        // console.log("inside uf");
        var todos = JSON.parse(data.currentTarget.responseText);
        // console.log("todos are", todos);
        this.setState({ todos: todos });
      } else {
        console.log("there is an error getting stuff");
      }
    };
    getRequest.open("GET", "https://cse204.work/todos", true);
    getRequest.setRequestHeader("x-api-key", key);
    getRequest.send();
  }
  //save to this.state.todos


  // handleCheckComplete(id){ajax call: PUT}

  // render app
  render(todo) {
    return (
      <div className="App">
        {/* <h2>ToDo App</h2> */}
        <div className="heading">
          <h1>Valeria Taglioni Chica's To-Do List:</h1>
        </div>
        <NewTodo
          handleAddButton={this.handleAddButton}
          handleTextChange={this.handleTextChange}
          userInput={this.state.userInput} />
        {this.state.todos.map((todo) =>
          <Todo key={todo.id} text={todo.text} id={todo.id} completed={todo.completed} delete={this.handleDeleteButton} />
          // <Todo handleDeleteButton={this.handleDeleteButton} text={todo.text}/>
        )}
        <div className="listDiv">
          <ul id="list" className="list" role="list"></ul>
        </div>
      </div>
    );
  }
}
export default App;




//function App()
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
