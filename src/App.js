import "./App.css";
import Chalender from "./components/calendar/calendar";
import StepperLine from "./components/SelectionStepper/StepperLine";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BaseStepsButtons from "./components/SelectionStepper/BaseStepsButtons";
import CategoriesStepsButtons from "./components/SelectionStepper/CategoriesStepsButtons";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Navbar from './components/navbar/navbar';
import waves from './blob.svg';

function App() {
  return (
    <Router>
      <div class='App' style={{ backgroundImage: `url(${waves})` }}>
        <Switch>
          <Route exact path="/">
          <Chalender placeID={1} courseID={1} placeName="mamas" isAdmin={true}/>
          </Route>

          <Route path="/Login" component={Login} />

          <Route path="/SignUp" component={SignUp} />

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
