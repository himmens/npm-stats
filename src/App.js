import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import ChipInput from 'material-ui-chip-input';
import AppDateInput from './components/AppDateInput';
import AppButton from './components/AppButton';
import { getDownloadsRanges } from './store/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.packages = ['react', 'angular', 'vue'];
    this.dateFrom = '2018-06-01';
    this.dateTo = '2018-07-01';
    this.onChipInputChange = this.onChipInputChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.onButtonShow = this.onButtonShow.bind(this);
  }

  onChipInputChange(data) {
    this.packages = data;
  }

  onDateFromChange(event) {
    this.dateFrom = event.target.value;
  }

  onDateToChange(event) {
    this.dateTo = event.target.value;
  }

  onButtonShow() {
    if (this.packages.length > 0) {
      const {dispatch} = this.props;
      dispatch(getDownloadsRanges(this.packages, this.dateFrom, this.dateTo));
    }
  }

  formatXAxis(time) {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }

  render() {
    const {downloads} = this.props;
    const colors = ['#8884d8', '#82ca9d', '#11ca9d', '#62119d'];

    const packagesDownloads = downloads ? Object.keys(downloads) : [];
    const mergedData = [];
    for (const p of packagesDownloads) {
      const arr = downloads[p];
      for (let i = 0; i < arr.length; i++) {
        if (!mergedData[i]) {
          mergedData[i] = {date: arr[i].date, [p]: arr[i].value};
        } else {
          mergedData[i][p] = arr[i].value;
        }
      }
    }

    return (
      <div className="rootDiv">
        <h3 className="title">
          Choose several npm packages below and press APPLY button to see download statistics
        </h3>
        <ChipInput
          className="chipInput"
          defaultValue={this.packages}
          onChange={this.onChipInputChange}
        />
        <AppDateInput
          label="From"
          defaultValue={this.dateFrom}
          onChange={this.onDateFromChange}
        />
        <AppDateInput
          label="To"
          defaultValue={this.dateTo}
          onChange={this.onDateToChange}
        />
        <AppButton label="Apply" onClick={this.onButtonShow} />

        <LineChart width={500} height={300} data={mergedData}>
          <XAxis
            dataKey="date"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={this.formatXAxis}
          />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip labelFormatter={this.formatXAxis} />
          <Legend />
          {this.packages.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={key}
              stroke={colors[index]}
            />
          ))}
        </LineChart>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  downloads: PropTypes.objectOf(PropTypes.array).isRequired,
};

function mapStateToProps(state) {
  return {
    downloads: state.downloads,
  };
}

export default connect(mapStateToProps)(hot(module)(App));