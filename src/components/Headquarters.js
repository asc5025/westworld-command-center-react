import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage.js'
import LogPanel from './LogPanel.js'


class Headquarters extends Component  {

  selectedHost = () => this.props.hosts.find(host => host.selected)

  inActiveHosts = () => {
    return this.props.hosts.filter(host => !host.active)
  }

  render() {
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage hosts={this.inActiveHosts()} selectHost={this.props.selectHost}/>
        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={this.selectedHost()} areas={this.props.areas} setAreaOfHost={this.props.setAreaOfHost} toggleHostActiveStatus={this.props.toggleHostActiveStatus}/>
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel msgs={this.props.msgs} toggleAllActiveStatus={this.props.toggleAllActiveStatus}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
