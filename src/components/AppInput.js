import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

function AppInput(props) {
  const {classes, placeholder, onChange} = props;
  return (
    <Input
      className={classes.input}
      placeholder={placeholder}
      onChange={onChange}
      inputProps={{'aria-label': 'Description'}}
    />
  );
}

AppInput.defaultProps = {
  placeholder: '',
  onChange: undefined,
};

AppInput.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(AppInput);