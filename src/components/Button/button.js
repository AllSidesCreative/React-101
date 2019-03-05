import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json: null,
      regionSelect: "Auckland",
      type: "Beach",
      rating: "Amber",
      isSubmitted: false,
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
  }

  handleRegion = (event) => {
    console.log(event.target.value);
    this.setState({ regionSelect: event.target.value });
  }

  handleType = (event) => {
    console.log(event.target.value);
    this.setState({ type: event.target.value });
  }

  handleRating = (event) => {
    console.log(event.target.value);
    this.setState({ rating: event.target.value });
  }

  renderRedirect = () => {
    var url = `/map?region=${this.state.regionSelect}&type=${this.state.type}&rating=${this.state.rating}`;
    if (this.state.isSubmitted) {
      return <Redirect to={url} />
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.renderRedirect()}
        </div>
        <div>
          <h1> {this.props.title}</h1>
          <form onSubmit={(e) => { this.handleClick(e) }}>
            <div class="form-group">

              <label for="exampleFormControlSelect1">Where would you like to swim?</label>

              <select class="form-control" id="regionSelect" value={this.state.regionSelect} onChange={(this.handleRegion)}>
                <option>Auckland</option>
                <option>Bay of Plenty</option>
                <option>Canterbury</option>
                <option>Hawkes Bay</option>
                <option>Manawatu-Wanganui</option>
                <option>Marlborough</option>
                <option>Nelson</option>
                <option>Northland</option>
                <option>Otago</option>
                <option>Southland</option>
                <option>Taranaki</option>
                <option>Tasman</option>
                <option>Waikato</option>
                <option>Wellington</option>
                <option>West Coast</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Would you like to swim at a beach, lake, or river?</label>
              <select class="form-control" id="type" value={this.state.type} onChange={(this.handleType)}>
                <option>Beach</option>
                <option>Lake</option>
                <option>River</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Which water quality level do you prefer?</label>
              <select class="form-control" id="rating" value={this.state.rating} onChange={(this.handleRating)}>
                <option>Amber</option>
                <option>Green</option>
              </select>
            </div>
            <div className="instructions">
              <h5>What do these colours mean?</h5>
              <p>Green: These sites are safe for anyone.</p>
              <p>Amber: These sites should be avoided by young children, the elderly, or anyone with a compromised immune system.</p>
            </div>
            <div className="applydiv">
              <button type="submit" class="apply">Apply</button>
            </div>
          </form>
          <div className="trendingdiv">
            <Link to={`/WaterQualityPage`}>
              <button type="button" class="apply">See the most trending sites</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
