import logo from './logo.svg';
import './App.css';
import BaseStepsButtons from './components/SelectionStepper/BaseStepsButtons';
import CategoriesStepsButtons from './components/SelectionStepper/CategoriesStepsButtons';
import PlacesStepsButtons from './components/SelectionStepper/PlacesStepsButtons';
import "./App.css";
import Chalender from "./components/calendar/calendar";
import StepperLine from "./components/SelectionStepper/StepperLine";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Navbar from './components/navbar/navbar';
import waves from './blob.svg';
import { useEffect, useState } from 'react';
import {Redirect} from "react-router-dom";

function App() {
  const [localStorage, setLocalStorage] = useState({})
  useEffect(()=>{
    setLocalStorage(JSON.parse(window.localStorage.getItem('course')))
  }, [])
  return (
    <Router>
      <div class='App' style={{ backgroundImage: `url(${waves})` }}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>

          <Route path="/Login" component={Login} />

          <Route path="/SignUp" component={SignUp} />

          <Route path="/Base" component={BaseStepsButtons} />

          <Route path="/Category" component={CategoriesStepsButtons} />

          <Route path="/places" component={PlacesStepsButtons} />

          <Route path="/placeCalender" component={Chalender} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
