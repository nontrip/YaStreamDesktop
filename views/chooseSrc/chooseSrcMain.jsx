'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import ChooseText from './chooseText.jsx'
import StreamSrc from './streamSrc.jsx'
import ButtonsSrc from './buttonsSrc.jsx'

export default class ChooseScrMain extends React.Component {
  render() {
    return (
        <div>
            <TitleBar windowName="Новый стрим"/>
            <ChooseText />
            <StreamSrc />
            <ButtonsSrc />
        </div>
    )
  }
}

