import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBundle from './components/SearchBundle';

class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeService = this.onChangeService.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}
  state = {
    response: [],
    idService: ''
  };

  componentDidMount() {
    this.callApi();
    // this.callApi()
    //   .then(res => this.setState({ response: res.bundles }))
    //   .catch(err => console.log(err));
  }
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   console.log(body);
  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };
  callApi = _ =>{
    const{idService} = this.state;
    fetch(`/api/hello?serviceSearch=${idService}`)
     .then(response => response.json())
     .then(response => this.setState({ response: response.bundles }))
     .catch(err => console.log(err))
  }

onChangeService(e) {
    this.setState({
        idService: e.target.value
    });
}
onSubmit(e) {
    e.preventDefault();
    console.log(`service is ${this.state.idService}`);
    this.setState({
        idService: ''
    })
}

  render() {
    const allBundles = this.state.response.map((bundle, index) => {
      return(
        <div className = "col-sm-4 py-2" key ={index}>
          <div className='card h-100 mt-4 card-body ' border-variant="secondary">         
              <div>{bundle.services.map(service => {return <div className="card-subtitle mb-2 text-muted" key={service}>{service}</div>})}</div> 
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
        <div className= "container"> 
          <div className = "row mt-4">
              <div className = "col md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <div style={{marginTop: 50}}>
                <h3>Add New Server</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Look for service:  </label>
                        <input type="text" value={this.state.idService} className="form-control" 
                        onChange={this.onChangeService}/>
                    </div>
                    <div className="form-group">
                        <button onClick={this.callApi} className="btn btn-primary">search</button>
                    </div>
                </form>
              </div>
              </div>
              <div className = "col-md-10">
              <div className = "row mt-4">
                {allBundles}
              </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
