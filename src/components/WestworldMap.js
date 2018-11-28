import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area.js'

const WestworldMap = ({areas, hosts, selectHost}) => {


  const renderAreas = () => {
    return areas.map(area => <Area key={area.name} value={area.name} limit={area.limit} name={area.name} selectHost={selectHost} hosts={hosts.filter(host => host.area === area.name)}/>)
  }

  return (
    <Segment id="map" >
      {renderAreas()}
    </Segment>
  )
}

export default WestworldMap
