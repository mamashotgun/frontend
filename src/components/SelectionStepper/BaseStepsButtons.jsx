import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function BaseStepsButtons() {
    const [bases, setBases] = useState([]);
    const [selectedBases, setSelectedBases] = useState(null);
    const history = useHistory()
    useEffect(async () => {
        try {
            let response = await axios.get("http://172.20.10.4:3001/locations")
            setBases(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }, [])

    const selectBase = (baseId) => {
        setSelectedBases(baseId);
        console.log(baseId)
        history.push({
            pathname: '/Category',  // query string
            params: { baseId: baseId }

        })
    }

    return (
        <div>
            {
                bases?.map((buttonText, index) => {
                    return (
                        <Button onClick={() => selectBase(buttonText.location_id)} key={index}>{buttonText.name}</Button>
                    )
                })
            }
        </div >
    );
}
