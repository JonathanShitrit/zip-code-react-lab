import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import './App.css';


function City({zip}) {
  return (
    <Card className="card">
      {/* <CardHeader
        className="card-header"
        subheader={props.item.LocationText}
      /> */}
      <CardContent>
          {zip}
          {/* <ul>
            <li>State: {props.item.State}</li>
            <li>Location: ({props.item.Lat}, {props.item.Long})</li>
            <li>Population: (estimated) {props.item.EstimatedPopulation}</li>
            <li>Total Wages: {props.item.TotalWages}</li>
          </ul> */}
      </CardContent>
    </Card>
  );
}

function CitySearchField({onChange}) {
  return (
    <div className="city-search">
      <label><strong>City:&nbsp;</strong></label>
      <input type="text" placeholder="Try Springfield" onChange={onChange}></input>
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      zipcodes: [],
    }
  }

  cityChanged(e) {
    this.setState({
      city: e.target.value
    }, () => {
      fetch(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
      .then(response => response.json())
      .then(zipcodes => this.setState({zipcodes}))
      .catch(error => console.log(error))
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <div className="container">
        <CitySearchField onChange={(e) => this.cityChanged(e)}/>
        <div className="results">

          {this.state.zipcodes && this.state.zipcodes.length > 0 ? 
            (
              
              this.state.zipcodes.sort().map(zip => {
                return (
                  <City key={zip} zip={zip} />
                )  
              })
            ) : (
              <div>
                No Results
              </div>
            )
            }
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default App;
