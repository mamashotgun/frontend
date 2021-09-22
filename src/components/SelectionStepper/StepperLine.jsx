import React, {useState, useEffect} from 'react';
import { Stepper, Step } from 'react-form-stepper';
import BaseStepsButtons from './BaseStepsButtons';
import StepsButtons from './StepsButtons';

const steps = ['בחר בסיס', 'בחר קטגוריה'];

export default function StepperLine() {
    const [stepNumber, setStepNumber] = useState(0);

    const MoveStepperByOne = () => {
        setStepNumber(stepNumber + 1);
    }

    return (
        <div>
            <Stepper activeStep={stepNumber}>
                <Step label="בחר בסיס" />
                <Step label="בחר קטגוריה" />
            </Stepper>
            {/* <StepsButtons steps={steps}></StepsButtons> */}
            <BaseStepsButtons></BaseStepsButtons>
        </div >
    );
}
