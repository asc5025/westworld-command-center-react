import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage.js'


class Headquarters extends Component  {

  selectedHost = () => this.props.hosts.find(host => host.selected)


  render() {
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage hosts={this.props.hosts} selectHost={this.props.selectHost}/>
        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={this.selectedHost()} areas={this.props.areas} toggleHostActiveStatus={this.props.toggleHostActiveStatus}/>
        </Grid.Column>
        <Grid.Column width={3}>
          {"logpanel"}
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
