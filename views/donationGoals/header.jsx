'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import Nav from '../common/nav.jsx'

export default class Header extends React.Component {
  render() {
    return (
        <div>
            <TitleBar windowName="Цели"/>
            <Nav first="Активные" second="Завершенные" />
        </div>
    )
  }
}
