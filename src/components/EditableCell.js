import React from 'react';
import { Form, Input } from 'antd';

const EditableCell = ({ editing, dataIndex, children }) => (
  <td>
    {editing ? (
      <Form.Item
        name={dataIndex}
      >
        <Input />
      </Form.Item>
    ): children}
  </td>
);

export default EditableCell;
