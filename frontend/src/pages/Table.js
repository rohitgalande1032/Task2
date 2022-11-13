import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import dateFormat from 'dateformat';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import PopupForm from './MyVerticallyCenteredModal';
import axios from "axios";


function BasicExample(props) {
  const remove = (id)=>{
    props.fun(id);
  }
  return (
    <>
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr.no</th>
          <th>Title</th>
          <th>Description</th>
          <th>Upload Date</th>
          <th>File Type</th>
          <th>File Size</th>
          <th>URL</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
            {
            props.data.map((val,i)=>{
              function formatSizeUnits(bytes){
                if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
                else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
                else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
                else if (bytes > 1)           { bytes = bytes + " bytes"; }
                else if (bytes == 1)          { bytes = bytes + " byte"; }
                else                          { bytes = "0 bytes"; }
                return bytes;
              }
                return <tr>
          <td>{i+1}</td>
          <td>{val.title}</td>
          <td>{val.desc}</td>
          <td>{dateFormat(val.time)}</td>
          <td>{val.fileType}</td>
          <td>{formatSizeUnits(val.fileSize)}</td>
          <td>
            <div>
              <a href={val.fileUrl}>View</a>
            </div>
          </td>
          <td>
          <div d-flex>
            <a href='' className='mx-2'><AiOutlineEdit /></a>
            <a  onClick={()=>remove(val.fileUrl)}><AiOutlineDelete /></a>
          </div>
          </td>
        </tr>
            })
      }
      </tbody>
      </Table>
      </>
  );
}

export default BasicExample;