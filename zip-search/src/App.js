import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>This is the {props.item.City} component</div>
  );
}

function ZipSearchField({onChange}) {
  return (
    <div className="zip-search">
      <label><strong>Zip Code:&nbsp;</strong></label>
      <input type="text" placeholder="Try 11367" onChange={onChange}></input>
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      cities: [],
    }
  }

  zipChanged(e) {
    this.setState({
      zipCode: e.target.value
    }, () => {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipCode}`)
      .then(response => response.json())
      .then(cities => this.setState({cities}))
      .catch(error => console.log(error))
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange={(e) => this.zipChanged(e)}/>
        <div className="results">
          {/* {this.state.cities && this.state.cities.map(item => {
              return (
                <City key={item.City} item={item} />
              )}
            )
          } */}
          {this.state.cities && this.state.cities.length > 0 ? 
            (
              this.state.cities.map(item => {
                return (
                  <City key={item.City} item={item} />
                )  
              })
            ) : (
              <div>
                No Results
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
