import logo from './logo.svg';
import './App.css';
import Chalender from './components/calendar/calendar'

function App() {
  return (
    <div className="App">
      <div className="main-section">
        <Chalender placeID={1} courseID={1} placeName="mamas"/>
      </div>
    </div>
  );
}

export default App;
