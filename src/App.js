import { useState } from 'react'
import './styles.css';

function App() {
  const [file, setFile] = useState();
  
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  return (
    <div className="App">
      <h1>CSV File Uploader</h1>
      <form className='Form-style'>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
}

export default App;
