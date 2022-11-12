import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function MyVerticallyCenteredModal(props) {
  const inidata = {
    title : "",
    desc : "",
    fileType :"",
    fileUrl :"",
    time : "",
    fileSize :''
  }
  const [allData,setAllData] = useState(inidata);
  const [selfile,setSelfile] = useState();

  function handChange(e) {
    const {name ,value} = e.target;
    setAllData({
      ...allData,
      [name] : value
    })
  }

  function handfilechange (e){
    setSelfile(e.target.files[0]);
  }

  const uploadFile = () =>{
    const formData  = new FormData();
    formData.append("file",selfile);
    formData.append("upload_preset","ml_default");

    axios.post("https://api.cloudinary.com/v1_1/dbeaehpop/image/upload",formData,{"Access-Control-Allow-Origin" :"*"}).then(async(res)=>{
      console.log(res);
      const obj = {
        title  : allData.title,
        desc : allData.desc,
        fileType : res.data.format,
        fileUrl : res.data.secure_url,
        fileSize : res.data.bytes,
        time : res.data.created_at
      }

      await axios.post('/create',obj).then(async(data)=>{
        if(data.status==200){
          alert("File Uploaded");
        }
        else{
          alert("Error File Not Uploaded");
        }
      }).catch((err)=>{
        console.log(err)
      })

    })
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Add New Image Media
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" type="text" placeholder="Title" value = {allData.title} onChange={handChange}/>
      </Form.Group>
      <Form.Label className='mb-3'>Description</Form.Label>
      <FloatingLabel controlId="floatingTextarea2">
        <Form.Control
          name="desc"
          as="textarea"
          value = {allData.decs}
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          onChange={handChange}
        />
      </FloatingLabel>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Attach File</Form.Label>
        <Form.Control name="filename" type="file" onChange={handfilechange}/>
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer className="mx-auto">
      <Button variant="primary" type="submit" onClick={uploadFile}>
        Upload
      </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function PopupForm(props) {
    // console.log(props)
  const [modalShow, setModalShow] = React.useState(props.val);

  return (
    <>
          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default PopupForm;