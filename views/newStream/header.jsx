'use babel';

import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
    <div>
        <div className="header">
            <p><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
            <h1>Новый стрим</h1>
            <p>Max Diakov <span><img src="../images/bitmapDown.png" width="8" height="5" /></span></p>
        </div>
        <hr className="hr-ns" />
    </div>)
  }
}
