'use babel';

import React from 'react'

export default class ButtonsSrc extends React.Component {
  render() {
    return (
        <div>
            <ul className="buttons">
                <li className="return"><i><img src="../images/bitmap.png" width="15px" height="12px" style={{marginRight: 5}}/></i>Назад</li>
                <li className="another">+ Другая</li>
            </ul>
        </div>
    )
  }
}