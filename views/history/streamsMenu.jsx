'use babel';

import React from 'react'
import Stream from './stream.jsx'

export default class StreamMenu extends React.Component {
  render() {
    return (
        <div className="streamMenu">
            <Stream />
            <Stream />
            <Stream />
            <Stream />
            <Stream />
            <Stream />
        </div>
    )
  }
}
