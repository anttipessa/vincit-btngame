import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

class Btn extends Component {

  state = {
    count: 20
  };

  handleClick = () => {
    this.setState(({ count }) => ({
      count: count - 1
    }));
  };

  render() {
    if( this.state.count === 0){
      return (<Button size="large" variant="contained" color="secondary" disabled onClick={this.handleClick}>Click</Button>)
    }
    return(
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
