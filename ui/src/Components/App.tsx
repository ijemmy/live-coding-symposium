import { useState } from 'react';
import Input from './Input';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import SubmissionResult from './SubmissionResult';
import { submitForm } from '../services';
import Image from './postNL.png'; // Import using relative path 0 46 51

const useStyles = makeStyles({
  form: {
    paddingTop: 50,
    width: '50%',
    margin: '0 auto',
    height: 330
  },
  button: {
    width: '100%',
  },
  field: {
    paddingBottom: 15
  },
  paperContainer: {
    background: `url(${Image})`,
    backgroundPositionX: 'center',
    backgroundPositionY: 10,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const classes = useStyles();

  function onFail() {
    setLoading(false);
    setFailed(true);
  }

  function onClickButton() {
    setLoading(true);
    submitForm({ name: 'Conf Attendee', email, subject: 'Conf feedback', details })
      .then((response) => {
        if (response.status !== 200) {
          onFail();
          return;
        }
        setLoading(false);
        setSubmitted(true);
      })
      .catch((err) => {
        onFail();
      });
  }

  return (
    <div>
      <Header />
      {failed ? (
        <SubmissionResult
          variant="error"
          open={failed}
          onClose={() => setFailed(false)}
        />
      ) : null}
      {submitted ? (
        <SubmissionResult
          variant="success"
          open={submitted}
          onClose={() => setSubmitted(false)}
        />
      ) : null}
      <Paper className={classes.paperContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className={classes.form}></div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.form}></div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.form}>
              <div className={classes.field}>
                <FormLabel color='primary'>Tell us how was "The PostNL Symposium" ?</FormLabel>
              </div>
              <Input
                className={classes.field}
                label="Email"
                onChange={setEmail}
              />
              <Input
                className={classes.field}
                label="Comments"
                onChange={setDetails}
                multiline
              />
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={onClickButton}
                disabled={loading}
              >
                SUBMIT
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.form}></div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
