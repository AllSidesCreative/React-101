import React, {Component} from 'react';
import WaterQualityPage from './bestQualityPlaces'

export default class ButtonWrapper extends Component {

    constructor (props)
        {
            super(props);
            this.state = {
                water: null
            }
        }

        

        componentDidMount()
        {
            fetch("./quality.json")

            .then(response => {
            
                return response.json();
            })

            .then(myJson => {
                this.setState({water: myJson});
            })

        }

    render () {

        return (
          <WaterQualityPage
            title={'Most Trending Swimming Places'} 
             
        water = {this.state.water}

            />
        );

        


       
       
      


    }
}
