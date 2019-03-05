import React, { Component } from 'react';
import _ from 'lodash';

export default class Button extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   label: 1,
    // };
  }


  componentDidMount() {
    //This is often used to make asynchronous calls like http requests
    console.log('Button component mounted!');
  }

  // shouldComponentUpdate() {
  //   return this.state.label % 2
  // }

  handleClick() {
    // this.setState({ label: this.state.label + 1 })
  }

//  sortData (response)
//  {
//    const dirmap = {
//      gt: { desc:0}
//    }

//    const doSort = ()

//  }


  render() {
    var trendingPlaces = this.props.water;
    var orderedList =  _.orderBy(trendingPlaces, ['TrendScore'], ['desc'])
    var top10 = _.slice(orderedList, 0, 15)
    
    console.log(trendingPlaces);
    console.log(orderedList);
    return (
      <div>
        <h1 id="bestQuality"> {this.props.title}</h1>
        <ul>
      {top10.map(place=>
      {
          return (
            <div id="info">
            <div class ="points"  key={place}> <label HeaderText=" Site Name">{place.SiteName} </label><br/>
            <label HeaderText=" Region"> {place.Region} </label> <br/>
            {/* <label HeaderText=" Trend Score"> Trend Score: {place.TrendScore} </label><br/> */}
            <label HeaderText=" Trend Period (Years)"> Current Trend: {place.Trend} </label><br/>
            <hr></hr>
            </div>
            </div>
            )
            
          
          
         
          
      })
      
    }
    </ul>
          
      

            

      </div>
    );
  }
}
