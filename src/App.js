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
      </div>
    </Router>
  );
}

export default App;
