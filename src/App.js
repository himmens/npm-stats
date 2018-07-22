import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line } from 'recharts';
import AppDateInput from './components/AppDateInput';
import AppButton from './components/AppButton';
import ChipInput from 'material-ui-chip-input'
import {getDownloadsRanges} from './store/actions';
import Immutable from 'seamless-immutable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Immutable({packages: ["react", "angular", "vue"], dateFrom: "2018-06-01", dateTo: "2018-07-01"});
    this.onChipInputChange = this.onChipInputChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.onButtonShow = this.onButtonShow.bind(this);
  }

  onChipInputChange(chips) {
    this.setState(Immutable(this.state).merge({packages: chips}));
  }

  onDateFromChange(event) {
    this.setState(Immutable(this.state).merge({dateFrom: event.target.value}));
  }

  onDateToChange(event) {
    this.setState(Immutable(this.state).merge({dateTo: event.target.value}));
  }

  onButtonShow() {
    const {packages, dateFrom, dateTo} = this.state;
    if (packages.length > 0) {
      const {dispatch} = this.props;
      dispatch(getDownloadsRanges(packages, dateFrom, dateTo));
    }
  }

  formatXAxis(time) {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }

  render() {
    const {downloads} = this.props;
    const {packages, dateFrom, dateTo} = this.state;
    const disabled = packages.length === 0;

    const packagesDownloads = downloads ? Object.keys(downloads) : [];
    const mergedData = [];
    for (let p of packagesDownloads) {
      const arr = downloads[p];
      for (let i = 0; i < arr.length; i++) {
        if (!mergedData[i])
          mergedData[i] = {date: arr[i].date, [p]: arr[i].value};
        else
          mergedData[i][p] = arr[i].value;
      }
    }

    const colors = ["#8884d8", "#82ca9d", "#11ca9d", "#62119d"];

    return (
      <div className="rootDiv">
        <h2>Download statistics for npm package</h2>
        <ChipInput defaultValue={packages} onChange={this.onChipInputChange} />
        <AppDateInput label="From" defaultValue={dateFrom} onChange={this.onDateFromChange}/>
        <AppDateInput label="To" defaultValue={dateTo} onChange={this.onDateToChange}/>
        <AppButton label="Show" onClick={this.onButtonShow} disabled={disabled} />

        <LineChart width={500} height={300} data={mergedData}>
          <XAxis
            dataKey="date"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter = {this.formatXAxis}
          />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Tooltip labelFormatter={this.formatXAxis}/>
          <Legend />
          {packages.map((key, index) => <Line key={key} type="monotone" dataKey={key} name={key} stroke={colors[index]} />)}
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

export default connect(mapStateToProps)(App);