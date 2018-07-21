import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function AppDateInput(props) {
  const {classes, label, defaultValue, onChange} = props;
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        label={label}
        defaultValue={defaultValue}
        className={classes.textField}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

AppDateInput.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppDateInput);