import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {

  render() {

    return (
      <div className='guide'>
        <h3 className="guide-title">Colour Guide</h3>
        <p className="guide-content-green">Safe to Swim</p>
        <p className="guide-content-amber">Moderately safe</p>
        <p className="guide-content-red">Do not swim here</p>

        {/* <p link rel="stylesheet" type="text/css" href="file.css" className="guide-content"><a href="https://watersafety.org.nz/">watersafety</a></p> */}
      </div>
    );
  }
}
