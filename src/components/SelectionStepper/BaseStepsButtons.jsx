import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import StepperLine from './StepperLine'
import { motion } from "framer-motion"

export default function BaseStepsButtons() {
    const [bases, setBases] = useState([]);
    const [selectedBases, setSelectedBases] = useState(null);
    const history = useHistory()
    useEffect(async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/locations`)
            setBases(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }, [])

    const selectBase = (location_id) => {
        setSelectedBases(location_id);
        console.log(location_id)
        history.push({
            pathname: '/Category',  // query string
            params: { location_id: location_id }

        })
    }

    return (
        <div>
            <StepperLine step={0} />
            <motion.div
                animate={{ x: "5rem" }}
                transition={{ ease: "easeOut", duration: 1 }} className="stepper-buttons-grid">                {
                    bases?.map((buttonText, index) => {
                        return (
                            <Button id="stepper-buttons" variant="outlined" onClick={() => selectBase(buttonText.location_id)} key={index}>{buttonText.name}</Button>
                        )
                    })
                }
            </motion.div>
        </div >
    );
}
