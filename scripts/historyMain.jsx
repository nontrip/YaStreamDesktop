'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import Nav from '../common/nav.jsx'
import DonatsMenu from './donatsMenu.jsx'
import NoSmth from './noSmth.jsx'

export default class HistoryMain extends React.Component {
  render() {
    let mainField = this.props.donats ? <DonatsMenu /> : <NoSmth obj="пожертвований"/>

    return (
        <div>
            {mainField}
        </div>
    )
  }
}
