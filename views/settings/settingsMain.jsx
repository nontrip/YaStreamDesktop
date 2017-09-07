'use babel';

import React from 'react';
import TitleBar from '../common/titleBar.jsx'
import MenuBar from '../common/menuBar.jsx'

export default class SettingsMain extends React.Component {
  render() {

        let points = this.props.points
        let pointsList = points.map(function(point, index){
            return <div key={index}><li key={index}>{point}</li></div>
        })

    return (
        <div>
            <TitleBar windowName="ЯСтрим" />
            <div className="up-layer">
                <p><img src="../images/bitmap.png" width="12" height="9"/>Назад</p>
                <h1>Настройки аккаунта</h1>
                <div className="hr"></div>
            </div>
            <MenuBar points={['Настройки отображения доната', 'Настройки отображения цели', 'Выход из аккаунта']} />
        </div>)
  }
}