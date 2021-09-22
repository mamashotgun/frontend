import logo from './logo.svg';
import './App.css';
import Chalender from './components/calendar/calendar'
import Navbar from './components/calendar/navbar/navbar'
import waves from './blob.svg';

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${waves})` }}>
      <div className="main-section">
        <Navbar />
        <Chalender/>
      </div>
    </div>
  );
}

export default App;
