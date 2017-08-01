'use babel';

import React from 'react';

export default class MiddleAudio extends React.Component {
  render() {
    return (
    <div className="audio">
        <div className="audio-img-house">
            <img src="../images/listen.png" width="49" height="49"/>
        </div>
        <div className="audio-text-house">
            <p>Запись аудио</p>
            <p>30 секунд</p>
        </div>
    </div>)
  }
}