import React from 'react';
import PropTypes from 'prop-types';

class ListRow extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {onClick} = this.props;
    if (onClick !== undefined) {
      onClick();
    }
  }

  render() {
    const backgroundColor = '#c0f0ff';
    const {children} = this.props;

    return (
      <div style={{backgroundColor}} onClick={this.onClick}>
        {children}
      </div>
    );
  }
}

ListRow.defaultProps = {
  onClick: undefined,
};

ListRow.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default ListRow;