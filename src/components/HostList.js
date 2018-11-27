import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host.js'

const HostList = (props) => {

  return(
    <Card.Group itemsPerRow={6}>
      {props.hosts.map(host => <Host key={host.id} img_url={host.imageUrl} selected={host.selected} id={host.id} selectHost={props.selectHost}/>)}
    </Card.Group>
  )
}

export default HostList
