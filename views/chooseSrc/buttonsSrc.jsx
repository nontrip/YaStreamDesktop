'use babel';

import React from 'react'

export default class ButtonsSrc extends React.Component {
  render() {
    return (
        <div>
            <ul className="buttons">
                <li>+ Другая</li>
                <li><i><img src="../images/bitmap.png" width="15px" height="12px" /></i>Назад</li>
            </ul>
        </div>
    )
  }
}