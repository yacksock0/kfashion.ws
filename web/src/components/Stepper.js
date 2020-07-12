import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BoundaryBox from "../views/labeling/BoundaryBox";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['이미지 리스트', '영역지정','기본 레이블링','전문 레이블링','검수'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return '이미지 리스트';
        case 1:
            return '영역지정';
        case 2:
            return '기본 레이블링';
        case 3:
            return '전문 레이블링';
        case 4:
            return '검수';
        default:
            return 'Unknown step';
    }
}

// let currentStepStore = inject('currentStepStore');
// currentStepStore = observer(HorizontalLinearStepper);
export default function HorizontalLinearStepper(props) {
    const classes = useStyles();
    // const currentStep = props.currentStepStore.currentStep;
    const [activeStep, setActiveStep] = React.useState();
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    useEffect(() => {
        setActiveStep(props.currentStep);
        getStepContent(props.currentStep);

    });

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleTapClick = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} style={{padding:10,}}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {/*<div>*/}
            {/*    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {activeStep === steps.length ? (*/}
            {/*        <div>*/}
            {/*            <Typography className={classes.instructions}>*/}
            {/*                All steps completed - you&apos;re finished*/}
            {/*            </Typography>*/}
            {/*            <Button onClick={handleReset} className={classes.button}>*/}
            {/*                Reset*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div>*/}
            {/*            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
            {/*            <div>*/}
            {/*                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>*/}
            {/*                    Back*/}
            {/*                </Button>*/}
            {/*                {isStepOptional(activeStep) && (*/}
            {/*                    <Button*/}
            {/*                        variant="contained"*/}
            {/*                        color="primary"*/}
            {/*                        onClick={handleSkip}*/}
            {/*                        className={classes.button}*/}
            {/*                    >*/}
            {/*                        Skip*/}
            {/*                    </Button>*/}
            {/*                )}*/}
            {/*                <Button*/}
            {/*                    variant="contained"*/}
            {/*                    color="primary"*/}
            {/*                    onClick={handleNext}*/}
            {/*                    className={classes.button}*/}
            {/*                >*/}
            {/*                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
}
