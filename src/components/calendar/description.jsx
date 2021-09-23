import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

export default function Description(props) {
    return (
        <div className="description-container">
            <Card>
                <div dir="rtl">
                    <h3>{props.name}</h3>
                    <h5>{props.description}</h5>
                </div>
            </Card>
        </div >
    );
}
