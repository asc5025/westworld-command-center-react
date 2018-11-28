import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = ({img_url, selected, id, selectHost}) => {

  return(
    <Card
      className={"host " + (selected ? "selected" : null)}
      onClick={() => selectHost(id)}
      image={img_url}
      raised
    />
  )
}

export default Host
