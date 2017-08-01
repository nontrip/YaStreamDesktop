'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import Nav from '../common/nav.jsx'

export default class Header extends React.Component {
  render() {
    return (
    <div>
        <TitleBar windowName="История" />
        <Nav first="История донатов" second="История трансляций"/>
    </div>)
  }
}
