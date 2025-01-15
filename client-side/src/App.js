// import React from 'react';
// import Counter from './features/counter/Counter.jsx';

// function App() {
//   return (
//     <div>
//       <h1>Redux Toolkit Example</h1>
//       <Counter />
//     </div>
//   );
// }

// export default App;









import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingTodo, setEditingTodo] = useState('');
  const url = 'http://localhost:5000';

  const getTodos = async () => {
    try {
      const response = await axios.get(`${url}/todos`)
      // console.log("Your get API data : ", response);
      setTodos(response.data)
    } catch (error) {
      console.error("Network error...!", error)
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

  const updateTodo = async () => {
    if (!editingTodo) return; 
    try {
        const response = await axios.put(`${url}/todos/${editingTodo}`, { text });
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === editingTodo ? response.data : todo
            )
        );
        setText(''); 
        setEditingTodo(null); 
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

  const deleteTodo = async (id)=>{
    try {
      await axios.delete(`${url}/todos/${id}`)
      setTodos(todos.filter(todos=> todos.id !== id))
    } catch (error) {
      console.error("Netwoek Error...!", error)
    }
  }

  const addTodos = async () => {
    if (text.trim() === '') return;
    try {
      const response = await axios.post(`${url}/todos`, { text });
      console.log("Check Post API data:", response);  //for testing 
      setTodos([...todos, response.data])
      setText('');
    } catch (error) {
      console.error("Network Error...!", error)
    }
  }

 const handleEdit = (todos)=>{
  setText(todos.text)
  setEditingTodo(todos.id);

 }


  return (
    <div className=' text-center'>

      <h1>To Do List</h1><br />
      <div className='d-flex flex-row justify-content-center align-content-center'>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            placeholder="Enter string"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="btn btn-primary" id="button-addon2" onClick={() => editingTodo ? updateTodo() : addTodos()}>
            {!editingTodo ? 'Add ToDos' : 'Update'}
          </Button>
        </InputGroup>
      </div>

      <div className='d-flex flex-row justify-content-center align-content-center'>
        <Table striped bordered hover variant="light" className='w-50'>
          <tbody>
            {
              todos.map((items,index) => 
                <tr key={index}>
                  <td>{items.text}</td>
                  <td className='w-25'>
                    <Button className='btn btn-success mx-1' onClick={()=>handleEdit(items)}>Edit</Button>
                    <Button className='btn btn-danger' onClick={()=>deleteTodo(items.id)}>Delete</Button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default App;
