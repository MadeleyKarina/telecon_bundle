import React, { Component } from 'react';

import App from '../App';

class SearchBundle extends Component {
    constructor(props) {
        super(props);
        this.onChangeService = this.onChangeService.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            idService: ''
        }
    }
    searchService = _ =>{
        const{idService} = this.state;
        fetch(`/api/hello?serviceSearch=${idService}`)
          .catch(err => console.error(err))
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
        return (
            <div style={{marginTop: 50}}>
                <h3>Add New Server</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Look service:  </label>
                        <input type="text" value={this.state.idService} className="form-control" 
                        onChange={this.onChangeService}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Node server" className="btn btn-primary"/>
                        <button onClick={this.searchService}>search</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchBundle;