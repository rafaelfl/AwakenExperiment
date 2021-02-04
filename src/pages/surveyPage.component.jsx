import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Sct from '../components/questionnaire-format/sct.component';
import { IV_Surveys } from '../model/IV-Surveys-Data';
import LikertMatrix from '../components/questionnaire-format/likertMatrix.component';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { UserContext } from './../constants/context.component';
import firebase from "../firebase/firebase.utils";


const useStyles = makeStyles((theme) => ({
  surveyRoot: {
    width: '100%',
    height: '100%',
    padding: '0 50px',
  },
  surveyHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  stepContent: {
    paddingBottom: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px',
  },
  instructions: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '24px',
    marginTop: '100px',
  },
}));

const SurveyPage = ({ match }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const user = useContext(UserContext);

  let urlElements = window.location.href.split('/');
  let userID = (urlElements[4]);
  const dbRef = firebase.database().ref("users/" + userID);

  const pushDataToDatabase = (freeResponse, multipleChoice) => {
    // Push user answers into database on finish
    if (activeStep === IV_Surveys.length - 1) {
      dbRef.child("Part1ResponseShortAnswer").set(freeResponse);
      dbRef.child("Part1ResponseMC").set(multipleChoice);
      console.log("Successfully submitted!")
    }
  }


  const handleNext = (activeStep) => {
    let Part1FreeResponse = localStorage.getItem('Part1FreeResponse');
    let Part1MC = localStorage.getItem('Part1MC');

    console.log("Local Storage:" + Part1FreeResponse);
    console.log("Local Storage:" + Part1MC);

    pushDataToDatabase(Part1FreeResponse, Part1MC);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderSwitch = (activeStep) => {
    const ivSurvey = IV_Surveys[activeStep];
    switch (ivSurvey.surveyType) {
      case 'SCT_SURVEY':
        return (
          <Sct
            key={'survey-' + ivSurvey.step}
            questData={ivSurvey.surveyData}
          />
        );
      case 'LIKERT_MATRIX_SURVEY':
        return (
          <LikertMatrix
            key={'likert-' + ivSurvey.step}
            questData={ivSurvey.surveyData}
          />
        );
      default:
        return <div>Survey Type is Invalid</div>;
    }
  };

  return (
    <div className={classes.surveyRoot}>
      <div className={classes.surveyHeader}>STUDY PART 1</div>
      <Stepper activeStep={activeStep}>
        {IV_Surveys.map((ivSurvey, index) => {
          return (
            <Step key={'step-' + activeStep + ':' + index}>
              <StepLabel />
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.stepContent}>
        {activeStep === IV_Surveys.length ? (
          <div className={classes.instructions}>
            <div>
              Thank you! Now you will proceed to part-2 of the experiment.
            </div>
            <div>Please press Proceed To Part-2.</div>
            <Link to='/experiments'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => console.log('proceed to experiments route')}
              >
                PROCEED TO PART 2
              </Button>
            </Link>
          </div>
        ) : (
            <>
              {renderSwitch(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 ? (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : (
                    <div></div>
                  )}
                {
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                  >
                    {activeStep === IV_Surveys.length - 1
                      ? 'Finish'
                      : 'Submit & Proceed'}
                  </Button>
                }
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default withRouter(SurveyPage);
