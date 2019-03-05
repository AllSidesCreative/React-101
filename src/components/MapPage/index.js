import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
import qs from 'qs';

import { connect } from 'react-redux';

import ControlPanel from './water-colour-info.js';
import WaterPin from './WaterPin';
import WaterInfo from './WaterPin-info';

import WATER from '../../data/water.json';

const TOKEN = 'pk.eyJ1Ijoib2xpdmlhZWxtb3JyaXNvbiIsImEiOiJjamt5djFxNWgwbmpqM3FwNGV0cGdrNjQ3In0.w81xElNUbCXiagqbEMuStA';


class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -36.8838967,
        longitude: 174.7477795,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight - 180,
      },
      popupInfo: null,
      region: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).region,
      type: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).type,
      rating: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).rating,
      results:
        [{
          "Region": "Canterbury region",
          "SiteName": "Waimakariri River at Rock Spur",
          "SiteType": "RiverSite",
          "LawaId": "LAWA-100735",
          "Latitude": -43.43273,
          "Longitude": 172.5899,
          "ValueDate": "18/12/2017 11:04",
          "Swim Icon Result": "Amber"
        }],
    };
  }

  componentDidMount() {
    fetch("./json.json")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ json: myJson });

        var results = myJson.filter(this.searchBy);
        const filtered = this.filterResult(results);
        var finalResults = filtered.slice(0, Math.min(100, results.length));

        if (finalResults.length > 0) {
          this.setState({ results: finalResults });
        }
      });
  }

  searchBy = (place) => {
    var isRegion = (this.state.region + " region" === place.Region)
    var isType = (this.state.type === place.SiteType)
    var isRating = (this.state.rating === place["Swim Icon Result"])

    return (isRegion && isType && isRating);
  }

  filterResult = unfilteredResult => {
    const filtered = unfilteredResult.reduce((acc, cur) => {
      acc[cur.SiteName] = cur;
      return acc;
    }, {});

    return Object.keys(filtered).map(key => filtered[key]);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });
  };

  _renderWaterMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={city.Longitude}
        latitude={city.Latitude} >
        <WaterPin rating={city["Swim Icon Result"]} size={20} onClick={() => this.setState({ popupInfo: city })} />
      </Marker>
    );
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.Longitude}
        latitude={popupInfo.Latitude}

        onClose={() => this.setState({ popupInfo: null })} >
        <WaterInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {

    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        longitude={this.state.results[0].Longitude}
        latitude={this.state.results[0].Latitude}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >

        {this.state.results.map(this._renderWaterMarker)}

        {this._renderPopup()}

        <ControlPanel containerComponent={this.props.containerComponent} />

      </MapGL>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getData: () => dispatch(UserActions.getData())
  }
}

function mapStateToProps(state) {
  return {
    jsonMockData: state.jsonMockData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
