import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import StepperLine from './StepperLine'
// import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function PlacesStepsButtons(props) {
    const [places, setPlaces] = useState([]);
    const stepperData = props.location.params
    const history = useHistory()

    useEffect(async () => {
        try {
            console.log(props)
            let response = await axios.get
                (`${process.env.REACT_APP_API_ADDRESS}/places?location_id=${stepperData.location_id}&category_id=${stepperData.category_id}`)
            console.log(response.data)
            setPlaces(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }, [])

    const LoadCalender = (place_id) => {
        history.push({
            pathname: '/Category',  // query string
            //params: { placeID: baseId, courseID: , placeName,  }

        })
    }

    return (
        <div>
            <StepperLine step={2} />
            {
                places?.map((buttonText, index) => {
                    return (
                        <Button id="stepper-buttons" variant="outlined" onClick={() => LoadCalender(buttonText.place_id)} key={index}>{buttonText.name}</Button>
                    )
                })
            }
        </div >
    );
}
