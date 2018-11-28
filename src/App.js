import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Headquarters from './components/Headquarters.js'
import WestworldMap from './components/WestworldMap.js'
import { Log } from './services/Log.js'

const HostURL = 'http://localhost:4000/hosts'
const AreasURL = 'http://localhost:4000/areas'


class App extends Component {

  state = {
    hosts: [],
    areas: [],
    msgs: []
  }

  selectHost = id => {
    let newHosts = this.state.hosts.map(host => {
     return host.id === id ? {...host, selected: true} : {...host, selected: false}})
     this.setState({hosts: newHosts})
   }

   activeHosts = () => {
     return this.state.hosts.filter(host => host.active)
   }

   // inActiveHosts = () => {
   //   return this.state.hosts.filter(host => !host.active)
   // }

  componentDidMount() {
    let hosts = fetch(HostURL).then(res => res.json())
    let areas = fetch(AreasURL).then(res => res.json())
    Promise.all([hosts, areas]).then(([hosts, areas]) => {
      return areas.map(area => {
        let formattedName = area.name.split("_").map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" ")
        area.formattedName = formattedName
        // hosts.forEach(host => host.active = true)
        return this.setState({hosts, areas})
      })
    })
  }

  toggleHostActiveStatus = id => {
    let wasActive;
    let foundHost;
    let newHosts = this.state.hosts.map(host => {
      if (host.id === id) {
        foundHost = host.firstName
        wasActive = host.active
        return {...host, active: !host.active}
      }
      return {...host}
    })
    let newMsg = wasActive ? Log.notify(`Decommissioned ${foundHost}`) : Log.warn(`Activated ${foundHost}`)
    this.setState({hosts: newHosts, msgs: [newMsg, ...this.state.msgs] })
  }

  toggleAllActiveStatus = (bool) => {
    let newHosts =  this.state.hosts.map(host => ({...host, active: bool}))
    let newMsg = bool ? Log.warn("Activating all hosts!") : Log.notify("Decomissioning all hosts.")
    this.setState({hosts: newHosts, msgs: [newMsg, ...this.state.msgs]})
  }

  getHostForArea = (areaName) => {
    return this.state.hosts.filter(host => host.area === areaName)
  }

  setAreaOfHost = (areaName, hostId) => {
    let foundHost = this.state.hosts.find(host => host.id === hostId)
    let foundArea = this.state.areas.find(area => areaName === area.name)
    if (this.getHostForArea(areaName).length < this.state.areas.find(a=> areaName === a.name).limit) {
      let newHosts = this.state.hosts.map(host => {
        if (host.id === hostId) {
          return {...host, area: areaName}
        }
        return {...host}
      })
      this.setState({hosts: newHosts, msgs: [Log.notify(`${foundHost.firstName} set in area ${foundArea.formattedName}`), ...this.state.msgs]})
      return true
    } else {
      this.setState({msgs: [Log.error(`Too many hosts. Cannot add ${foundHost.firstName} to ${foundArea.formattedName}`), ...this.state.msgs]})
      return false
    }
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap hosts={this.activeHosts()} areas={this.state.areas} selectHost={this.selectHost} getHostForArea={this.getHostForArea} />
        <Headquarters hosts={this.state.hosts} areas={this.state.areas} selectHost={this.selectHost} setAreaOfHost={this.setAreaOfHost} toggleHostActiveStatus={this.toggleHostActiveStatus} toggleAllActiveStatus={this.toggleAllActiveStatus} msgs={this.state.msgs}/>
      </Segment>
    )
  }
}

export default App;
