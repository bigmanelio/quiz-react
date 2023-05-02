import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button} from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useParams } from 'react-router-dom';

export default function Training() {
  const [content, setContent] = useState('');
  const params = useParams();
  const surveyId = params.id;

  function handleChange(value) {
    setContent(value);
    console.log(content);
  }

  async function handleSubmit() {
    try {
  
     var data = (JSON.stringify({
        Id: surveyId,
        Data: content
  
      }));
  
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
<ReactQuill
        id="editor"
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'align',
          'list', 'bullet',
          'link', 'image'
        ]}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      </>
  );
}