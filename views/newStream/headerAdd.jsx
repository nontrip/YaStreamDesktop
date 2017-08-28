'use babel';

import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
    <div>
        <div className="header">
            <p className="return"><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
            <h1>Новый стрим</h1>
            <div className="start">
              <img src="../images/du.png" />
            </div>
        </div>
        <hr className="hr-ns" />
    </div>)
  }
}
