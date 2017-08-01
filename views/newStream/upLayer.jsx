'use babel';

import React from 'react';

export default class UpLayer extends React.Component {
  render() {
    return (
    <div className="upLayer">
        <h1>Основные настройки:</h1>
        <div className="mainSettings">
            <ul className="ul-left">
                <li><input id="name" type="text" placeholder="Название трансляции"/></li>
                <li><input id="channel" type="text" placeholder="Ваш никнейм"/></li>
                <li><input id="link" type="text" placeholder="Ссылка на трансляцию"/></li>
                <li className="getQR">Получить QR код</li>
            </ul>
            <ul className="ul-right">
                <li><img src="../images//addLogo.png" width="116" height="116"/></li>
                <li><img src="../images/addPreview.png" width="116" height="116"/></li>
            </ul>
        </div>
    </div>)
  }
}