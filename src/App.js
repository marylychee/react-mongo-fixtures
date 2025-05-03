import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form>
          <input type={"file"} accept={".csv"} />
          <button>Import CSV</button>       
      </form>
    </div>
  );
}

export default App;
