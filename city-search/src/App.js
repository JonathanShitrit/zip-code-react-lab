import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './App.css';

function City({zip}) {
  return (
    <Card className="card">
      <CardContent>
          {zip}
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

// const State = ({state}) => {
//   return ( 
//     <Card className="card">
//       <CardContent>
//           {state}
//       </CardContent>
//     </Card>
//   );
// }
 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      zipcodes: [],
      // states: new Set()
    }
  }

  cityInputChanged(e) {
    this.setState({
      city: e.target.value,
      // states: new Set(),
      zipcodes: []
    }, () => {
      this.getCitysFromApi()
    })
  }

  getCitysFromApi() {
    fetch(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
      .then(response => response.json())
      .then(zipcodes => 
        this.setState({
          zipcodes
        }, () => {
            // this.getStatesFromZipcodes()
        })
      )
      .catch(error => console.log(error))
  }

  // getStatesFromZipcodes() {
  //   this.state.zipcodes.map(zip => {
  //     fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json)
  //       // json.map(item => {
  //         // this.setState({states: this.state.states.add(item.State)})
  //       // })
  //     })
  //     .catch(error => console.log(error))
  //   })
  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <div className="container">
        <CitySearchField onChange={(e) => this.cityInputChanged(e)}/>
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

          {/* {this.state.states && this.state.states.size > 0 ? 
            (
              this.state.states.forEach(state => {
                return (
                  <State key={state} state={state} />
                )  
              })
            ) : (
              <div>
                No Results
              </div>
            )
          } */}
          
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default App;
