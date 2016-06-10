import React, { Component } from 'react';
import RELAYR from 'RELAYR';
import Meter from './meter';


export default class App extends Component {
  constructor() {
    super();
    this.relayr = RELAYR.init({
      appId: "1e7e744d-07af-45ad-98fd-0f9720f797bc",
      redirectUri:"http://localhost:3000"
    });
    this.state = {
      party: 0
    };

    this.relayr.login({
      success: (token) => {
        this.relayr.devices().getDeviceData({
            deviceId: 'cc76c893-3267-4690-a719-337bcb4702cb',
            incomingData: (data) => {
              console.log(data);
              this.setState({ party: data.readings[0].value });
            }
         });
      }
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Meter party={this.state.party}></Meter>
      </div>
    );
  }
}
