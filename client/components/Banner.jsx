import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <h1>HOME-AID</h1>
        </Link>
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
