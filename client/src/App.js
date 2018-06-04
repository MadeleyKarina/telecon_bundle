import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.bundles }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    const allBundles = this.state.response.map(bundle => {
      return(
        <div className = 'col-md-4'>
          <div className='card mt-4' > 
            <div className = 'card-body'>
              <p>{bundle.services.map(service => {return <div><mark>{service}</mark></div>})}</p> 
              <div className = 'card-header'>
                Price : 
                <span className = 'badge badge-danger ml-2'>
                 {bundle.price} 
                </span>
              </div>
            </div>
          </div>
        </div>  )}
    )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className= "container"> 
          <div className = "row mt-4">
            {allBundles}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
