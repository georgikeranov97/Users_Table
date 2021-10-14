import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Checkbox, Button, Card
} from 'antd';
import { onAddUserRequest } from '../appRedux/actions/UsersActions';
import { connect } from 'react-redux';
import Header from './Header';

/**
 * @description Renders NewUser component
 * @param {Object} props
 * @returns {JSX}
 */
const NewUser = (props) => {
  /**
   * @description Handles on submit form
   * @param {Object} formData
   * @returns {void}
   */
  const onSubmitForm = (formData) => {
    const { onAddUser, history } = props;
    onAddUser(formData);

    history.push('/users');
  }

  return (
    <div>
      <Header />
      <div className="form-wrapper">
        <Card title="Add User">
          <Form onFinish={onSubmitForm} >
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Please enter a name',
                },
              ]}
            >
              <Input placeholder="Type your first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Please enter a name',
                },
              ]}
            >
              <Input placeholder="Type your last name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input valid email',
                },
              ]}
            >
              <Input placeholder="Type your email" />
            </Form.Item>
            <Form.Item
              label="Active"
              name="active"
              className="form-checkbox"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: 'Please enter a city',
                },
              ]}
            >
              <Input placeholder="Type your city" />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: 'Please enter a country',
                },
              ]}
            >
              <Input placeholder="Type your country" />
            </Form.Item>

            <Button className="green-btn" type="primary" htmlType="submit">Submit</Button>
          </Form>
        </Card>
        
      </div>
    </div>
  );
}

NewUser.defaultProps = {
  history: {},
};

NewUser.propTypes = {
  history: PropTypes.shape(),
  onAddUser: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onAddUser: (user) => dispatch(onAddUserRequest(user)),
});

export default connect(null, mapDispatchToProps)(NewUser);
