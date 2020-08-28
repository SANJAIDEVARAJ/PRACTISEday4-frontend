import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import TodoForm from "./todoForm";
import TodoList from "./List";

class App extends React.Component {
  constructor(props){
    super();
    this.state={
      items : []
    }
 }


async componentDidMount() {
  const res = await axios.get(
    'http://localhost:4000/tasks'
  );
  const data = res.data;
  this.setState({
      items: data.data,
  });
}


  addTodo = (itemStr) => {
    const id = Math.floor(Math.random() * 1000) ;
    const todoObj = { id: id, title: itemStr };
    this.setState({
      items: [...this.state.items, todoObj],
    });


    axios.post('http://localhost:4000/tasks', todoObj)
    .then(res => {
      console.log(res.data);
    })
    

  }

  deleteTodo = (idx) => {
    const updatedItems = [...this.state.items].filter((item) => item.id !== idx);
    this.setState({ items: updatedItems });
   
  };
 

  render() {
   
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            My Todo App
          </a>
        </nav>
        <TodoForm addTodo={this.addTodo} />
        <TodoList tasks={this.state.items} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App;