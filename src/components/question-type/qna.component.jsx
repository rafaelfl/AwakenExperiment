import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  qnaRoot: {
    marginBottom: '20px',
  },
}));

const QNA = ({ label }) => {
  const classes = useStyles();

  return (
    <div className={classes.qnaRoot}>
      <label>{label}</label>
      <TextField variant='outlined' fullWidth />
    </div>
  );
};

export default QNA;
