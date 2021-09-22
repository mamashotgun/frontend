import logo from './logo.svg';
import './App.css';
import Chalender from './components/calendar/calendar'
import StepperLine from './components/SelectionStepper/StepperLine'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BaseStepsButtons from './components/SelectionStepper/BaseStepsButtons';
import CategoriesStepsButtons from './components/SelectionStepper/CategoriesStepsButtons';

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Chalender />
          </Route>
          <Route path="/Base" component={BaseStepsButtons} />

          <Route path="/Category" component={CategoriesStepsButtons} />

          <Route path="/about">
            <StepperLine />
          </Route>
        </Switch>
=======
    <div className="App">
      <div className="main-section">
        <Chalender placeID={1} courseID={1} placeName="mamas"/>
>>>>>>> chalendarComponent
      </div>
    </Router>
  );
}

export default App;
