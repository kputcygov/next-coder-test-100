import logo from './logo.svg';
import './App.css';

function App() {
  alert(`environment: ${process.env.REACT_APP_MODE}, app version: ${process.env.REACT_APP_VERSION}, app BE FQDN: ${process.env.REACT_APP_FQDN}`)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
