import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Headquarters from './components/Headquarters.js'

const HostURL = 'http://localhost:3000/hosts'
const AreasURL = 'http://localhost:3000/areas'


class App extends Component {

  state = {
    hosts: [],
    areas: []
  }

  selectHost = id => {
    let newHosts = this.state.hosts.map(host => {
     return host.id === id ? {...host, selected: true} : {...host, selected: false}})
     this.setState({hosts: newHosts})
   }

  componentDidMount() {
    let hosts = fetch(HostURL).then(res => res.json())
    let areas = fetch(AreasURL).then(res => res.json())
    Promise.all([hosts, areas]).then(([hosts, areas]) => this.setState({hosts: hosts, areas: areas}))
  }

  toggleHostActiveStatus = id => {
    let newHosts = this.state.hosts.map(host => {
      if (host.id === id) {
        return {...host, active: !host.active}
      }
      return {...host}
    })
    this.setState({hosts: newHosts})
  }

  setAreaOfHost = (areaName, hostId) => {
    let newHosts = this.state.hosts.map(host => {
      if (host.id === hostId) {
        return {...host, area: areaName}
      }
      return {...host}
    })
    this.setState({hosts: newHosts})
  }

  render(){
    return (
      <Segment id='app'>
        <Headquarters hosts={this.state.hosts} areas={this.state.areas} selectHost={this.selectHost} toggleHostActiveStatus={this.toggleHostActiveStatus}/>
      </Segment>
    )
  }
}

export default App;
