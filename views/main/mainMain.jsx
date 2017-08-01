'use babel';

import React from 'react';
import TitleBar from '../common/titleBar.jsx'
import MiddleField from './middleField.jsx'
import MenuBar from '../common/menuBar.jsx'

export default class MainMain extends React.Component {
  render() {
    return (
    <div>
        <TitleBar windowName='Яндекс.Стрим'/>
        <MiddleField balance={this.props.balance} number={this.props.number}/>
        <MenuBar points={['Новый стрим', 'История', 'Цели по сборам', 'Настройки аккаунта','Выход']}/>
    </div>)
  }
}