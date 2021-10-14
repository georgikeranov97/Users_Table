import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, notification, Select, Card,
} from 'antd';
import axios from 'axios';
import { REQUEST_URL } from '../constants/UserConstants';
import Header from './Header';

const { Option } = Select;

/**
 * @description Renders Login component
 * @param {Object} props
 * @returns {JSX}
 */
const Login = (props) => {
  const { history } = props;
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get(`${REQUEST_URL}/register`).then((response) => {
      setAccounts(response.data);
    }).catch((error) => console.log(error));
  }, []);

  /**
   * @description 
   * @param {Object} data
   * @returns {void}
   */
  const onLogin = (data) => {
    const loggedUser = accounts.find((user) =>
      user.password === data.password && user.username === data.username
      && user.email === data.email && user.country === data.country);
    
    if (loggedUser) {
      localStorage.setItem('loggedUser', data.username);
      notification.success({
        message: 'You have logged successfully!',
      });

      history.push('/users');
      
    } else {
      notification.error({
        message: 'Invalid credentials',
        description: 'You have to enter valid username, password, email and country.In case you have not any account, please create one in the register page',
      });
    }
  }

  /**
   * @description Navigates to register route
   * @returns {void}
   */
  const navigateToRegister = () => {
    history.push('/register');
  }

  return (
    <div>
      <Header />
      <div className="form-wrapper">
        <Card title="Login" bordered>
          <Form onFinish={onLogin}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your name',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input a valid email',
                  type: 'email',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: 'Please select your country',
                }
              ]}
            >
              <Select>
                <Option key="bulgaria" value="Bulgaria">Bulgaria</Option>
                <Option key="romania" value="Romania">Romania</Option>
              </Select>
            </Form.Item>
            <div className="form-buttons-container">
              <Button className="green-btn" type="primary" htmlType="submit">Login</Button>
              <Button className="green-btn" type="primary" onClick={navigateToRegister}>Register</Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
    
  );
}

Login.defaultProps = {
  history: {},
};

Login.propTypes = {
  history: PropTypes.shape()
};

export default Login;
