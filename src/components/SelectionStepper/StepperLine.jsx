import React, { useState, useEffect } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import BaseStepsButtons from './BaseStepsButtons';
import StepsButtons from './StepsButtons';

const steps = ['בחר בסיס', 'בחר קטגוריה'];

export default function StepperLine({ step }) {
    const [stepNumber, setStepNumber] = useState(step);

    const MoveStepperByOne = () => {
        setStepNumber(stepNumber + 1);
    }

    return (
        <div>
            <Stepper activeStep={stepNumber}>
                <Step label="בחר בסיס" />
                <Step label="בחר קטגוריה" />
                <Step label="בחר מקום" />
            </Stepper>
        </div >
    );
}
