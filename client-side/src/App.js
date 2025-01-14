import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css';

function App() {
  return (
    <div className=' text-center'>
      <h1>To Do List</h1><br />
      <div className='d-flex flex-row justify-content-center align-content-center'>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            placeholder="Enter string"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="btn btn-primary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
      </div>
      <div className='d-flex flex-row justify-content-center align-content-center'>
        <Table striped bordered hover variant="light" className='w-50'>
          <tbody>
            <tr>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>@twitter</td>
              <td>
                <Button className='btn btn-success'>Update</Button>
                <Button className='btn btn-danger'>Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
