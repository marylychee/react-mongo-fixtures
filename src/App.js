import { useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    //Adding files to the formdata 
    formData.append('csvFile', file);

    axios({ 
      // Endpoint to send files 
      url: "http://localhost:9000/upload", 
      method: "POST", 
      // Attaching the form data 
      data: formData, 
    }) 
    .then((res) => { }) // Handle the response from backend here 
    .catch((err) => { 
      console.log(err);
    }); 
  }

  return (
    <div className="App">
      <h1>CSV File Uploader</h1>
      <form className='Form-style' onSubmit={handleSubmit}>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        {file ? <p>Selected file: {file.name}</p> : null}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
