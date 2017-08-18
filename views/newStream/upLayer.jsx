'use babel';

import React from 'react';

export default class UpLayer extends React.Component {
  render() {
    return (
    <div className="upLayer">
        <h1>Основные настройки:</h1>
        <div className="mainSettings">
            <ul className="ul-left">
                <li><input className="valid" id="name" type="text" placeholder="Название трансляции"/></li>
                <li><input className="valid" id="channel" type="text" placeholder="Ваш никнейм"/></li>
                <li><input className="valid" id="link" type="text" placeholder="Ссылка на трансляцию"/></li>
                <li>
                    <ul className="mainButtons">
                        <li>
                            <div className="getQR">
                                <p>Геймкод</p>
                            </div>
                        </li>
                        <li>
                            <div className="getLink">
                                <p>Форма</p>
                            </div>
                        </li>
                    </ul>   
                </li>
            </ul>
            <ul className="ul-right">
                <li>
                    <div className="image-upload">
                        <label htmlFor="logo-upload">
                            <img id="logo" draggable='false' src="../images/addLogo.png" width="116" height="116"/>
                        </label>
                        <input id="logo-upload" className="hidden-input" type="file" accept="image/png"/>
                    </div>
                    <div className="image-upload">
                        <label htmlFor="preview-upload">
                            <img draggable='false' id="preview" src="../images/addPreview.png" width="185.3" height="116"/>
                        </label>
                        <input id="preview-upload" className="hidden-input" type="file" accept="image/png"/>
                    </div>
                </li>
            </ul>
        </div>
    </div>)
  }
}