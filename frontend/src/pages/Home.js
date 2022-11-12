import React ,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

import About from './About'
import Table from './Table'
import PopupForm from './PopupForm'

function NavScrollExample() {
  
  const [allFiles,setallFiles] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const obj = {name : "hiii"};
     axios.post('/read',obj).then(async(data)=>{
        if(data.status==200){
          setallFiles(data.data)
        }
        else{
          alert("Error ocurs in read files");
        }
      }).catch((err)=>{
        console.log(err)
      })
  }, [])
  return (
    <>
    { modalShow ? <PopupForm val={true} />
     : <></>
      }
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Media Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <DropdownButton id="dropdown-basic-button" title="Add New Media" className="m-5">
      <Dropdown.Item href="#/action-1" onClick={()=> {setModalShow(true)}}>New Image</Dropdown.Item>
      <Dropdown.Item href="#/action-2">New Video</Dropdown.Item>
      <Dropdown.Item href="#/action-3">New Pdf</Dropdown.Item>
    </DropdownButton>
    <div className='mx-5'>
    <Table data={allFiles}/>
    </div>
    </>
  );
}

export default NavScrollExample;