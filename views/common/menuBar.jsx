'use babel';

import React from 'react';

export default class MenuBar extends React.Component {
  render() {
    let points = this.props.points
    let pointsList = points.map(function(point, index){
        return <div key={index}><li key={index}>{point}</li><br/></div>
    })
    return (
    <div className="menu-bar">
        <ul>
            {pointsList}
        </ul>
    </div>)
  }
}
