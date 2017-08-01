'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import DonatsMenu from './donatsMenu.jsx'
import NoSmth from '../common/noSmth.jsx'

export default class HistoryMain extends React.Component {
  render() {
    let mainField = this.props.donats ? <DonatsMenu donats={this.props.donats}/> : <NoSmth obj="пожертвований"/>

    return (
        <div>
            {mainField}
        </div>
    )
  }
}
