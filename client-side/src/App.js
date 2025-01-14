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
  const url = 'http://localhost:3000/';

  const getTodos = async () => {
    try {
      const response = await axios.get(`${url}/todos`)
      console.log("Your get API data : ", response);
      setTodos([...todos, response.data])
    } catch (error) {
      console.error("Network error...!", error)
    }
  }

  useEffect(() => {
    getTodos();
  }, [])


  const addTodos = async () => {
    if (text.trim() === '') return;
    try {
      const response = await axios.post(`${url}/todos`, { text });
      console.log("Check Post API data:", response);  //for testing 
      setText('');
    } catch (error) {
      console.error("Network Error...!", error)
    }
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
          <Button variant="btn btn-primary" id="button-addon2" onClick={() => addTodos()}>
            Add ToDos
          </Button>
        </InputGroup>
      </div>

      <div className='d-flex flex-row justify-content-center align-content-center'>
        <Table striped bordered hover variant="light" className='w-50'>
          <tbody>
            {
              todos.map((items) => 
                <tr >
                  <td>{items}</td>
                  <td className='w-25'>
                    <Button className='btn btn-success mx-1'>Update</Button>
                    <Button className='btn btn-danger'>Delete</Button>
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
