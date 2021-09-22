import * as React from 'react';
import { Button } from '@mui/material';
import { useState } from 'preact/hooks';

export default function StepsButtons({ steps }) {
    const [selections, setSelections] = useState([]);


    return (
        <div>
            {
                steps.map((buttonText, index) => {
                    return (
                        <Button key={index}>{buttonText}</Button>
                    )
                })
            }
        </div >
    );
}
