import React from 'react';
import style from '../css/components/Banner.css';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className={style.banner}>
        <h1>DOMESTIC MANAGER</h1>
        <div id={style.bannerOptions}>
          <h3>TEST</h3>
          <h3>TEST</h3>
          <h3>TEST</h3>
          <h3>TEST</h3>
        </div>
      </div>
    );
  }
}

export default Banner;
