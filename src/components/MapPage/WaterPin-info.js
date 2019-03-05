import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const {info} = this.props;
    const displayName = `${info.SiteName}`;
    const region = `${info.Region}`;
    const rating = `${info["Swim Icon Result"]}`;
    const type = `${info.SiteType}`;

    return (
      <div className= "pinPopUp">
        <div>
          <p>{displayName}</p>
          <p>{region}</p>
          <p>{rating}</p>
        </div>
      </div>
    );
  }
}
