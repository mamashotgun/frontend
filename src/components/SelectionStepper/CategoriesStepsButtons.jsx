import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
// import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

export default function CategoriesStepsButtons(props) {
    useEffect(async () => {
        try {
            console.log(props.location)
            let response = await axios.get("http://172.20.10.4:3001/categories")
            setCategories(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }, [])
    const [categories, setCategories] = useState([]);


    return (
        <div>
            {
                categories?.map((buttonText, index) => {
                    return (
                        <Button key={index}>{buttonText.name}</Button>
                    )
                })
            }
        </div >
    );
}
