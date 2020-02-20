import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

class Btn extends Component {

  state = {
    count: localStorage.getItem("score") || 20
  };

  handleClick = () => {
    this.setState(({ count }) => ({
      count: count - 1
    }));
    localStorage.setItem("score", this.state.count - 1)
  };

  reset = () => {
    this.setState(() => ({
      count: 20
    }));
  };

  render() {
    if (this.state.count <= 0) {
      return (
        <div>
          <Button size="large" variant="contained" color="secondary" disabled onClick={this.handleClick}>Click Me</Button>
          <br></br>
          <Button size="large" variant="contained" color="primary" onClick={this.reset}>Try again?</Button>
        </div>)
    }
    return (
      <div>
        <div>{this.state.count}</div>
        <Button size="large" variant="contained" color="secondary" onClick={this.handleClick}>Click</Button>
      </div>
    )
  }
}


function App() {
  return (
    <div className="App">
      <h1>Button Game</h1>
      <Btn />
    </div>
  );
}

export default App;
