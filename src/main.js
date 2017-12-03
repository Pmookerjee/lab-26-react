'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';
import {say} from 'cowsay';
import './style/main.scss';

const faker = require('faker');
const fakerAPI = ('http://faker.hook.io/?property');
let arr = [];

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

    this.updateCowsay = this.updateCowsay.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    

    this.state = { 

      cowsay: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      options: [],
      choice: ''
    }
  }

  renderChoices() {

    return this.state.options.forEach(opt => {
      return `<option>${opt}</option>`
      
    })

  }

  updateCowsay() {

    let option = this.state.choice;

    superagent.get(`${fakerAPI}=${option}`)
    .then(result => {
        let cowsay = result.text;
        this.setState({cowsay});          
    })
    .catch(err => { throw err; });
  }

  componentDidMount() {
    console.log("_STATE_", this.state);
  }

  componentWillMount() {

    let fakerOpts = localStorage.getItem('fakerOpts');
    
    if (fakerOpts) { 
       options = JSON.parse(fakerOpts);
       this.setState({options});
    }
    else { 

      superagent.get(fakerAPI)
        .then(result => {
            let options = result.body[0].expected;
            
            console.log('options: ', options)
            this.setState({options});          
        })
        .catch(err => { throw err; });
    }

  }

  selectOption(e) {

    let choice = e.target.value;
    console.log('picked: ', choice);
    this.setState({choice});

  }

  render() {

    return (
      <div>
          <div id="cowsayWrapper">
            <Header />
              <pre>{say({text: this.state.cowsay})}</pre>
              <form id="form">
              <select id="select" onChange={this.selectOption}>
                <option value="">Choose your option</option>
                {
                  this.state.options.map(opt => {
                    return <option key={opt} value={opt}>{opt}</option>;
                  })
                }
              </select>
              </form>     
             <a href="#" onClick={this.updateCowsay} id="button">Click to update</a>
          </div>
      </div>
    )
  }

}


ReactDom.render(<App/>, document.getElementById('root'));
