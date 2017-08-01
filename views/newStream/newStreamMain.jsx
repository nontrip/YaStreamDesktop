'use babel';

import React from 'react';
import Header from './header.jsx'
import UpLayer from './upLayer.jsx'
import BottomLayer from './bottomLayer.jsx'

export default class MainMain extends React.Component {
  render() {
    return (
    <div>
       <Header />
       <UpLayer />
       <BottomLayer />
    </div>)
  }
}