import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

/**
 * @description Renders Header component
 * @returns {JSX}
 */
const Header = () => {
  /**  
   * @description Triggers when logout is clicked
   * @returns {void}
   */
  const onLogout = () => {
    if (localStorage.getItem('loggedUser') !== null) {
      localStorage.removeItem('loggedUser');

      window.location.pathname = '/login';
    }
  }

  return (
    <div className="header-wrapper">
      <div>
        <h1 className="white-text-color">Users Management</h1>
      </div>
      <div className="logged-user-info">
        {localStorage.getItem('loggedUser') !== null
          ? (
            <h1 className="white-text-color">{localStorage.getItem('loggedUser')}</h1>
          ) : null}
        <div className="icon-holder">
          {window.location.pathname !== '/login' && window.location.pathname !== '/register'
            ? (
              <Tooltip title="Logout">
                <LogoutOutlined
                  className="logout-icon white-text-color"
                  onClick={onLogout}
                />
              </Tooltip>
            ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
