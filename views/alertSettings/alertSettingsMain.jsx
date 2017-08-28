'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import IndicatorBar from './indicatorBar.jsx'
import ParametersBar from './parametersBar.jsx' 
import Buttons from './buttons.jsx'

export default class alertSettingsMain extends React.Component {
  render() {
    return (
        <div>
            <div className="up-layer">
                <h1>Настройки отображения цели</h1>
                <p className="return"><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
                <div className="hr"></div>
            </div>
            <div className="main">
                <div className="color-house">
                    <h1>Индикатор прогресса:</h1>
                    <ul className="left-ul">
                        <li>
                            <h2>Цвет индикатора</h2>
                            <input className="color" id="indi-color" />
                        </li>
                        <li>
                            <h2>Цвет фона индикатора</h2>
                            <input className="color" id="indiBack-color" />
                        </li>
                    </ul>
                    <ul className="right-ul">
                        <li>
                            <h2>Цвет шрифта</h2>
                            <input className="color" id="font-color" />
                        </li>
                        <li>
                            <h2>Цвет фона</h2>
                            <input className="color" id="back-color" />
                        </li>
                    </ul>
                </div>
                <div className="height-house">
                    <h2>Высота индикатора: </h2>
                    <div className="range">
                        <p>0</p>
                        <input type="range" min="0" max="100" step="1" defaultValue="50" />
                        <p className="max">50 px</p>
                    </div>
                </div>
                <div className="params">
                    <h1>Параметры отображения элементов:</h1>
                    <div className="param">
                        <h2>Отображение заголовка</h2>
                        <label className="switch">
                            <input id="donatAuto" type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="param param2">
                        <h2>Отображение собранной <br/> суммы</h2>
                        <label className="switch">
                            <input id="donatAuto" type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="param">
                        <h2>Отображение границ сбора</h2>
                        <label className="switch">
                            <input id="donatAuto" type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="fonts">
                        <div className="font">
                            <h2>Стиль текста внутри индикатора</h2>
                            <img src="../images/fontStyle.png" />
                        </div>
                        <div className="font">
                            <h2>Стиль текста снаружи индикатора</h2>
                            <img src="../images/fontStyle.png" />
                        </div>
                    </div>
                    <div className="buttons">
                        <div className="button">Превью</div>
                        <div className="button">Сохранить</div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
