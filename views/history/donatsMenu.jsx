'use babel';

import React from 'react'
import Donat from './donat.jsx'

export default class DonatsMenu extends React.Component {
  render() {
    let donats = this.props.donats
    let answered
    let donatsList = donats.map(function(donat, index){
        return <Donat key={index} Answered={donat.answer} donatInfo={donat}/>
    })
    return (
        <div className="donatsMenu">
            {donatsList}
        </div>
    )
  }
}
