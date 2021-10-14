import { Button } from 'antd';
import React from 'react';
import Header from './Header';

/**
 * @description Renders NotFoundComponent
 * @returns {JSX}
 */
const NotFoundComponent = (props) => {
  const { history } = props;

  /**
   * @description goes back to the last location
   * @returns {void}
   */
  const goBack = () => {
    history.goBack();
  }

  return (
    <div>
      <Header />
      <div className="not-found-wrapper">
        <div>
          <Button className="green-btn" onClick={goBack}>Back</Button>
        </div>
        <h1>404</h1>
        <h3>Page Not Found</h3>
      </div>
    </div>
  );
}

export default NotFoundComponent;
