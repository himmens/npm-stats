import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListView from './components/ListView';
import ListRow from './components/ListRow';
import AppInput from './components/AppInput';
import { getDownloadsData } from './store/reducer';
import { getDownloadsRanges } from './store/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onInputConfirm = this.onInputConfirm.bind(this);
  }

  onInputConfirm(text) {
    const {dispatch} = this.props;
    dispatch(getDownloadsRanges(text));
  }

  onInputCancel() {
    console.log('onInputCancel');
  }

  renderRow(data) {
    return (
      <ListRow key={data.date}>
        {`${data.date}  =>  ${data.downloads}`}
      </ListRow>
    );
  }

  render() {
    const {downloads} = this.props;
    return (
      <div>
        <AppInput placeholder="Enter npm package" onConfirm={this.onInputConfirm} onCancel={this.onInputCancel} />
        <ListView
          data={downloads}
          renderRow={this.renderRow}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  downloads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    downloads: getDownloadsData(state),
  };
}

export default connect(mapStateToProps)(App);