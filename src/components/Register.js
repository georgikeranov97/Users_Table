import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, notification, Select, Card
} from 'antd';
import axios from 'axios';
import { REQUEST_URL } from '../constants/UserConstants';
import Header from './Header';

const { Option } = Select;

/**
 * @description Renders Register component
 * @param {Object} props
 * @returns {JSX}
 */
const Register = (props) => {
  const { history } = props;
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get(`${REQUEST_URL}/register`).then((response) => {
      setRegistrations(response.data);
    }).catch((error) => console.log(error));
  }, []);

  /**
   * @description Triggers when register button is clicked
   * @param {Object} data
   * @returns {void}
   */
  const onRegister = (data) => {
    const checkIfExists = registrations.length
      ? registrations.find((account) => account.username === data.username || account.email === data.email)
      : undefined;

    if (checkIfExists) {
      notification.error({
        message: 'This user is already exists.',
        description: 'Please choose an unique username',
      });
    } else {
      fetch(`${REQUEST_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        notification.success({
          message: 'You have registered successfully!',
          description: 'You are going to be redirected just in few seconds.',
        });
      })
        .catch((error) => notification.error({
          message: 'Something went wrong.',
        }));
      
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  }

  return (
    <div>
      <Header />
      <div className="form-wrapper">
        <Card title="Register">
          <Form onFinish={onRegister}>
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
              <Input placeholder="Select your username" />
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
              <Input.Password placeholder="Select your password" />
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
                    message: 'Please select your country.',
                  }
                ]}
              >
                <Select>
                  <Option key="bulgaria" value="Bulgaria">Bulgaria</Option>
                  <Option key="romania" value="Romania">Romania</Option>
                </Select>
              </Form.Item>

            <Button className="green-btn" type="primary" htmlType="submit">Register</Button>
          </Form>
        </Card>
      </div>
    </div>
    
  );
}

Register.defaultProps = {
  history: {},
};

Register.propTypes = {
  history: PropTypes.shape(),
};

export default Register;
