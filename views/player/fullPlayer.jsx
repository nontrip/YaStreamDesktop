'use babel';

import React from 'react';
import Donat from './donat.jsx'

export default class FullPlayer extends React.Component {
  render() {
    let donats = this.props.donats
    let donatsList = donats.map(function(donat, index){
        return <Donat key={index} donatInfo={donat} middle="text"/>
    })
    return (
    <div>
        {donatsList}
    </div>)
  }
}