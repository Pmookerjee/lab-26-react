import React from 'react';
import ReactDom from 'react-dom';

import {say} from 'cowsay';

import './style/main.scss';

class Header extends React.Component {

  render() {

    return (
      <header>
        <h1>Generate Cowsay Lorem</h1>
      </header>
    )
  }
}

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = { 

      cowsay: '',
      type: 'cow'
    }
  }

  getText() {



  }

  render() {

    return (
      <div>
          <Header />
          <div id="cowsayWrapper">
              <div id="cowsay">{this.state.cowsay}</div>
              <a href="#" onClick={this.getText} id="up">U</a>
          </div>
      </div>
    )
  }

}