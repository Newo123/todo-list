import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList'
// import TodoListLocalStorage from './components/TodoListLocalStorage'
import { Container } from 'react-bootstrap';


function App() {

  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('itemsTodo')) || [])

  return (
    <div className="App">
      <Header />
      <Container>
        <AddTodo todo={todo} setTodo={setTodo} />
        <TodoList todo={todo} setTodo={setTodo} />
      </Container>
    </div>
  );
}

export default App;
