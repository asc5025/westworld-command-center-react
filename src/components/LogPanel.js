import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

class LogPanel extends React.Component {

  state = { logs: [], status: true }

  dummyLogs = () => {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    let logs = []

    logs.unshift(Log.warn("This is an example of a warn log"))
    logs.unshift(Log.notify("This is an example of a notify log"))
    logs.unshift(Log.error("This is an example of an error log"))

    return logs
  }

  toggle = () => {
    this.setState({ status: !this.state.status })
    this.props.toggleAllActiveStatus(this.state.status)
  }

  render() {
    return(
      <Segment className="HQComps" id="logPanel">
      <pre>
      {this.props.msgs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>

      <Button
      fluid
      color={this.state.status ? "red" : "green" }
      content={this.state.status ? "ACTIVATE ALL" : "DECOMMISSION ALL"}
      onClick={this.toggle}
      />
      </Segment>
    )

  }
}

export default LogPanel
