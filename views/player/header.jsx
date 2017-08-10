'use babel';

import React from 'react';
import TitleBar from '../common/titleBar.jsx'

export default class Header extends React.Component {
  render() {
    return (
    <div>
        <TitleBar windowName="Пульт управления"/>
        <div className="header-main">
            <div className="header-left">
                <h1>{this.props.name}</h1>
                <h2>Собрано {this.props.total} руб.</h2>
            </div>
            <div className="settings">
                <img draggable='false' src="../images/settingsdark.png" width="35" height="25"/>
            </div>
            <div className="header-right">
                <img draggable='false' src="../images/hambActive.png" width="35" height="25"/>
            </div>
        </div> 
        <hr />
    </div>)
  }
}