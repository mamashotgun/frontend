import React, { useState, useEffect } from "react";
import { Button, Card } from "@mui/material";
import StepperLine from "./StepperLine";
// import { useState, useEffect } from 'preact/hooks';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../navbar/navbar";

export default function PlacesStepsButtons(props) {
  const [places, setPlaces] = useState([]);
  const location_id = localStorage.getItem("location_id");
  const category_id = localStorage.getItem("category_id");
  const history = useHistory();
  const course = JSON.parse(localStorage.getItem("course"));

  useEffect(async () => {
    try {
      console.log(props);
      let response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/places?location_id=${location_id}&category_id=${category_id}`
      );
      console.log(response.data);
      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const LoadCalender = (placeObject) => {
    console.log(course);
    console.log({
      placeID: placeObject.place_id,
      PlaceName: placeObject.name,
      description: placeObject.description,
    });
    history.push({
      pathname: "/placeCalender", // query string
      params: {
        placeID: placeObject.place_id,
        PlaceName: placeObject.name,
        description: placeObject.description,
        course: course,
      },
    });
  };

  return (
    <div>
      <NavBar name={course.display_name}></NavBar>
      <StepperLine step={2} />
      <motion.div
        animate={{ x: "5rem" }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="stepper-buttons-grid"
      >
        {places?.map((buttonText, index) => {
          return (
            <Button
              id="stepper-buttons"
              variant="outlined"
              onClick={() => LoadCalender(buttonText)}
              key={index}
            >
              {buttonText.name}
            </Button>
          );
        })}
      </motion.div>
    </div>
  );
}
