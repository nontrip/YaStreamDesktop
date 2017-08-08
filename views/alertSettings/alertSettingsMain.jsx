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
            <TitleBar windowName="Настройки отображение цели"/>
            <div className="up">
                <h1>Индикатор процесса: </h1>
                <hr />
            </div>
            <IndicatorBar />
            <div className="range"><p className="left-p">Высота индикатора: </p><input type="range" min="20" max="100" step="1" defaultValue="60" /><p id="input-height" className="input-height"></p><p className="p-right"> px</p></div>
            <div className="middle">
                <h1>Параметры отображения элементов: </h1>
                <hr />
            </div>
            <ParametersBar />
            <Buttons />
        </div>
    )
  }
}
