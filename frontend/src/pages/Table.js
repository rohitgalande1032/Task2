import { useState } from 'react';
import Table from 'react-bootstrap/Table';

function BasicExample(props) {
    console.log(props.data)
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Upload Date</th>
          <th>File Type</th>
          <th>File Size</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
            {
            props.data.map((val,i)=>{
                return <tr>
          <td>i</td>
          <td>{val.title}</td>
          <td>{val.desc}</td>
          <td>{val.time}</td>
          <td>{val.fileType}</td>
          <td>{val.fileSize}</td>
          <td>{val.fileUrl}</td>
        </tr>
            })
      }
      </tbody>
      </Table>
      </>
  );
}

export default BasicExample;