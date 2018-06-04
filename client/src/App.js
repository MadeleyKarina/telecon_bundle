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
        <div className = "col-sm-4 py-2">
          <div className='card h-100 mt-4 card-body ' border-variant="secondary"> 
           
              <p>{bundle.services.map(service => {return <div className="card-subtitle mb-2 text-muted">{service}</div>})}</p> 
              <div className = 'card-header align-bottom' slot="footer">
                Price : 
                <span className = 'badge badge-danger ml-2'>
                 {bundle.price} 
                </span>
              </div>
            
          </div>
        </div>  )}
    )
    return (
      <div className="App">
       <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Telecom bundle
          </a>
        </nav>
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
