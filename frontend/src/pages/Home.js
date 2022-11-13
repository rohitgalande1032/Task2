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
import { Oval } from 'react-loader-spinner'
import About from './About'
import Table from './Table'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'

function NavScrollExample() {

  const [allFiles,setallFiles] = useState([]);
  const [allFilesTemp,setallFilesTemp] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currType, setCurrType] = useState();

  const mysort = (e)=>{
    const id = e;
    var allFilestemp2 = allFiles;
    if(id==0){
      setallFilesTemp(allFiles);
    }
    else if(id==1){
      setallFilesTemp(allFilestemp2.sort((file1,file2)=> new Date(file1.time).getTime()-new Date(file2.time).getTime()));

    }
    else if(id==2){
      // console.log(new Date(allFilestemp2[0].time).getTime())
      // const res = allFilestemp2.sort((file1,file2)=> new Date(file2.time).getTime()-new Date(file1.time).getTime());
      // console.log(res)
      setallFilesTemp(allFilestemp2.sort((file1,file2)=> new Date(file2.time).getTime()-new Date(file1.time).getTime()));
    }
    else if(id==3){
      const res = allFilestemp2.filter((file)=>{
        return file.fileType=='png' || file.fileType=='jpg' || file.fileType=='jpeg';
      })
      setallFilesTemp(res);
    }
    else if(id==4){
      const res = allFilestemp2.filter((file)=>{
        return file.fileType=='pdf';
      })
      setallFilesTemp(res);
    }
    else if(id==5){
      const res = allFilestemp2.filter((file)=>{
        return file.fileType=='mp4';
      })
      setallFilesTemp(res);
    }
  }

  const reloadData = async(fileUrl)=>{
    console.log("reloaded");
    if(fileUrl!="1111"){
     await axios.post('/delete',{id:fileUrl}).then(async(data)=>{
        if(data.status==200){
          setallFiles(data.data)
          setallFilesTemp(data.data)
        }
        else{
          alert("Error ocurs in read files");
        }
      }).catch((err)=>{
        console.log(err)
      }) 
    }
    else{
      console.log("finalll")
      const obj = {name : "hiii"};
      axios.post('/read',obj).then(async(data)=>{
         if(data.status==200){
           setallFiles(data.data)
           setallFilesTemp(data.data)
         }
         else{
           alert("Error ocurs in read files");
         }
       }).catch((err)=>{
         console.log(err)
       })
    } 
    }
  useEffect(() => {
    const obj = {name : "hiii"};
     axios.post('/read',obj).then(async(data)=>{
        if(data.status==200){
          setallFiles(data.data)
          setallFilesTemp(data.data)
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
    { modalShow ? <MyVerticallyCenteredModal val={true} fun={reloadData}/>
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
<div className='d-flex justify-content-between'>
    <DropdownButton id="dropdown-basic-button" title="Add New Media" className="m-5">
      <Dropdown.Item href="#/action-1" onClick={()=> {setModalShow(true);setCurrType(1)}}>New Image</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={()=> {setModalShow(true);setCurrType(2)}} >New Video</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={()=> {setModalShow(true);setCurrType(3)}} >New Pdf</Dropdown.Item>
    </DropdownButton>
    <DropdownButton id="dropdown-basic-button" variant="success" title="Sort Media By " className="m-5">
    <Dropdown.Item href="#/action-1" eventKey="0" onClick={() => mysort(0)}>All</Dropdown.Item>
      <Dropdown.Item href="#/action-1" eventKey="1" onClick={() => mysort(1)}>Newest to Oldest</Dropdown.Item>
      <Dropdown.Item href="#/action-2" eventKey="2" onClick={() => mysort(2)}>Oldest to Newest</Dropdown.Item>
      <Dropdown.Item href="#/action-3" eventKey="3" onClick={() => mysort(3)}>Images only</Dropdown.Item>
      <Dropdown.Item href="#/action-3" eventKey="4" onClick={() => mysort(4)}>Pdf only</Dropdown.Item>
      <Dropdown.Item href="#/action-3" eventKey="5" onClick={() => mysort(5)}>Video only</Dropdown.Item>
    </DropdownButton>
    </div>
    <div className='mx-5'>
    <Table data={allFilesTemp} fun={reloadData}/>
    </div>
    </>
  );
}

export default NavScrollExample;