import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo.js'


const Details = (props) => {

  const renderSomething = (host) => host ? <HostInfo key={props.host.area} host={props.host} areas={props.areas} setAreaOfHost={props.setAreaOfHost} toggleHostActiveStatus={props.toggleHostActiveStatus}/> : <Image size='medium' src={Images.westworldLogo}/>

  return(
    <Segment id="details" className="HQComps">
      {renderSomething(props.host)}
    </Segment>
  )
}

export default Details
