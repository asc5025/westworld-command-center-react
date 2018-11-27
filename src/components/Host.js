import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className={"host " + (props.selected ? "selected" : null)}
      onClick={() => props.selectHost(props.id)}
      image={props.img_url}
      raised
    />
  )
}

export default Host
