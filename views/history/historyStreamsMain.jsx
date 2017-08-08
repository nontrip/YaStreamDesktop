'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import Nav from '../common/nav.jsx'
import StreamsMenu from './streamsMenu.jsx'
import NoSmth from '../common/noSmth.jsx'

export default class HistoryMain extends React.Component {
  render() {
    let mainField = this.props.tranlations ? <StreamsMenu streams={this.props.tranlations}/> : <NoSmth obj="трансляций"/>

    return (
        <div>
            {mainField}
        </div>
    )
  }
}
