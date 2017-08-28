'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import MiddleField from './middleField.jsx'
import MenuBar from '../common/menuBar.jsx'

export default class MainAuto extends React.Component {
  render() {
    return (
        <div>
            <TitleBar windowName="ЯСтрим"/>
            <MiddleField />
            <MenuBar points={['Вход в аккаунт', 'Регистрация аккаунта', 'Выход']}/>
        </div>
    )
  }
}
