import React, { useEffect } from 'react';
import RatingBox from '../components/commercialRating.component';
import ButtonBox from '../components/commercialButton.component';
import Button from '@material-ui/core/Button';
import { Experiment_Image_List } from '../model/Comm-Manip-Images';
import { makeStyles } from '@material-ui/core/styles';
import { shuffle } from 'lodash';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  experimentsRoot: {
    width: '100%',
    height: '100%',
    padding: '0 50px',
  },
  button: {
    float: 'right',
    //marginRight: '30px',
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '24px',
    marginTop: '100px',
  },
}));

const CommercialManipPage = () => {
  const classes = useStyles();
  const experimentCondition = JSON.parse(
    localStorage.getItem('experiment_condition')
  );
  const [activeExper, setActiveExper] = React.useState(0);
  const steps = getSteps();
  //scroll to top of page on reload
  const picRef = React.createRef();
  useEffect(() => {
    picRef.current.scrollIntoView();
  }, [activeExper]);


  let imageIndex = 0;
  if (experimentCondition === 1) {
    imageIndex = 1;
  }
  function getSteps() {
    return ['', '', ''];
  }
  const handleBack = () => {
    setActiveExper((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (activeExper) => {
    setActiveExper((prevActiveExper) => prevActiveExper + 1);
  };

  const renderSwitch = (activeExper) => {
    const experiment = Experiment_Image_List[imageIndex][activeExper].experiment;
    switch (experiment.type) {
      case 'RATING':
        return (shuffle(experiment.images).map((e, key) => (
          <RatingBox
            name={'image' + Math.floor(Math.random() * Math.floor(1000))}
            photo={e.src}
            key={key}
          />
        )))
      case 'PICKUP':
        return (experiment.images.map((e, key) => (
          //change this to new component
          <ButtonBox
            name={'image'}
            photo={e.src}
            text={e.text}
            key={key}
          />
          //<RatingBox />
        )))
    }
  }
  return (
    <div ref={picRef} className={classes.experimentsRoot}>
        <Stepper activeExper={activeExper}>
        {steps.map((label)  => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
          </Step>
          );
        })}
      </Stepper>
      <div className={classes.experimentsRoot}>
        {activeExper === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Link to='/commercialRating'>
              <Button
                variant='contained'
                color='primary'
              >
                PROCEED
              </Button>
            </Link>
  
          </div>
        ):(
          <>
             {renderSwitch(activeExper)}
             <div className={classes.button}>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleNext}
        >
          {activeExper === Experiment_Image_List[imageIndex].length - 1
            ? 'Finish'
            : 'Proceed'}
        </Button>
            </div>
      </>

        )}

      </div>
    </div>
  )
}

export default CommercialManipPage;