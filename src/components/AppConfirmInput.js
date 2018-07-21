import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

class AppConfirmInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.input = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    const {value} = event.target;
    this.setState({value});
  }

  onKeyDown(event) {
    const {onConfirm, onCancel} = this.props;
    const {value} = this.state;

    if (event.keyCode === 13) { // ENTER
      onConfirm(value);
    } else if (event.keyCode === 27) { // ESC
      this.setState({value: ''});
      onCancel();
    }
  }

  render() {
    const {classes, placeholder} = this.props;
    const {value} = this.state;
    return (
      <Input
        ref={this.input}
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    );
  }
}

AppConfirmInput.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppConfirmInput);