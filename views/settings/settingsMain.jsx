'use babel';

import React from 'react';
import TitleBar from '../common/titleBar.jsx'

export default class SettingsMain extends React.Component {
  render() {

        let points = this.props.points
        let pointsList = points.map(function(point, index){
            return <div key={index}><li key={index}>{point}</li></div>
        })

    return (
        <div>
            <TitleBar windowName="Настройки" />
            <div className="settings">
                <ul>
                    {pointsList}
                </ul>
            </div>
        </div>)
  }
}