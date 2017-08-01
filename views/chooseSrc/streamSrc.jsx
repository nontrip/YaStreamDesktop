'use babel';

import React from 'react'

export default class StreamSrc extends React.Component {
  render() {
    return (
        <div>
            <ul className="sources">
                <li className="twitch">
                    <div className="img-house">
                        <img draggable="false" src="../images/twitch.png"/>
                    </div>
                </li>
                
                <li className="youtube">
                    <div className="img-house">
                        <img draggable="false" src="../images/youtubeicon.png"/>
                    </div>
                </li>
            </ul>
        </div>
    )
  }
}