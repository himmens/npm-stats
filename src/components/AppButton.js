import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function AppButton(props) {
  const {classes, label, disabled, onClick} = props;
  return (
    <Button variant="contained" color="primary" className={classes.button} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}

AppButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppButton);