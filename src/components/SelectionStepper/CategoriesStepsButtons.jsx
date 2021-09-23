import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
// import { useState, useEffect } from 'preact/hooks';
import axios from "axios";
import { useHistory } from "react-router-dom";
import StepperLine from "./StepperLine";
import { motion } from "framer-motion";

export default function CategoriesStepsButtons(props) {
  const locationId = localStorage.getItem("location_id");
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const course = JSON.parse(localStorage.getItem("course"));

  useEffect(async () => {
    try {
      console.log(props);
      let response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/categories`
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const LoadPlace = (category_id) => {
    localStorage.setItem("location_id", locationId);
    localStorage.setItem("category_id", category_id);
    history.push({
      pathname: "/Places", // query string
    });
  };

  return (
    <div>
      <StepperLine step={1} />
      <motion.div
        animate={{ x: "5rem" }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="stepper-buttons-grid"
      >
        {categories?.map((buttonText, index) => {
          return (
            <Button
              id="stepper-buttons"
              variant="outlined"
              onClick={() => LoadPlace(buttonText.category_id)}
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
