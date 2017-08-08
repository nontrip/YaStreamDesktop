'use babel';

import React from 'react'
import Stream from './stream.jsx'

export default class StreamMenu extends React.Component {
  render() {
    let streams = this.props.streams
    let streamsList = streams.map(function(stream, index){
        return <Stream key={index} streamInfo={stream}/>
    })
    return (
        <div className="streamMenu">
            {streamsList}
        </div>
    )
  }
}
