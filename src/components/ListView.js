import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

class ListView extends React.Component {
  renderRowById(data) {
    const {renderRow} = this.props;
    return renderRow(data);
  }

  render() {
    const {data} = this.props;
    return data ? (
      <div>
        {_.map(data, this.renderRowById.bind(this))}
      </div>
    ) : (
      <div>
        Wait
      </div>);
  }
}


ListView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.func.isRequired,
};

export default ListView;