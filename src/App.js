import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Headquarters from './components/Headquarters.js'
import WestworldMap from './components/WestworldMap.js'

const HostURL = 'http://localhost:4000/hosts'
const AreasURL = 'http://localhost:4000/areas'


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
    Promise.all([hosts, areas]).then(([hosts, areas]) => {
      return areas.map(area => {
        let formattedName = area.name.split("_").map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" ")
        area.formattedName = formattedName
        return this.setState({hosts, areas})
      })
    })
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

  getHostForArea = (areaName) => {
    return this.state.hosts.filter(host => host.area === areaName)
  }

  setAreaOfHost = (areaName, hostId) => {
    if (this.getHostForArea(areaName).length < this.state.areas.find(a=> areaName === a.name).limit) {
      let newHosts = this.state.hosts.map(host => {
        if (host.id === hostId) {
          return {...host, area: areaName}
        }
        return {...host}
      })
      this.setState({hosts: newHosts})
    } else {
      console.log('error')
    }
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap hosts={this.state.hosts} areas={this.state.areas} selectHost={this.selectHost} getHostForArea={this.getHostForArea} />
        <Headquarters hosts={this.state.hosts} areas={this.state.areas} selectHost={this.selectHost} setAreaOfHost={this.setAreaOfHost} toggleHostActiveStatus={this.toggleHostActiveStatus}/>
      </Segment>
    )
  }
}

export default App;
