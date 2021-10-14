import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  onDeleteUserRequest,
  onFetchUsersRequest,
  onUpdateUserRequest,
} from "../appRedux/actions/UsersActions";
import {
  Table, Input, Button, Form, Popconfirm,
} from "antd";
import EditableCell from "./EditableCell";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Header from "./Header";

/**
 * @description Renders Users component
 * @returns {JSX}
 */
class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      usersAll: [],
      editingKey: '',
      isUpdateSaved: false,
      filterCriteria: {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
      },
    }
    this.columns = [];
    this.tableFilterMap = {
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      active: 'active',
      country: 'country',
      city: 'city',
      action: 'action',
    };
    this.tableValues = Object.values(this.tableFilterMap);
    
    this.tableValues.forEach((value, index) => {
      this.columns.push({
        title: () => (
          <div>
            <span>{this.adaptTableHeaders(value)}</span>
            {value !== 'action' && value !== 'active'
              ? (
                <div>
                  <Input
                    placeholeder="Search..."
                    onChange={this.handleSearch}
                    id={value}
                  />
                </div>
              ) : null}
          </div>
        ),
        dataKey: value,
        minWidth: 200,
        dataIndex: value,
        editable: value !== 'action' && value !== 'active',
        sortDirections: ['ascend', 'descend'],
        showSorterTooltip: true,
        sorter: (value !== 'action' && value !== 'active') ? (user1, user2) => this.handleSorting(user1, user2, value) : null,
        render: (content, record) => {
          const editable = this.isEditing(record);
          if (value === 'action') {
            return editable ? (
              <span>
                <Button
                  className="green-btn save-btn"
                  onClick={() => this.onSave(record.id)}
                  icon={<SaveOutlined />}
                >Save</Button>
                <Button
                  className="green-btn"
                  onClick={() => this.setState({ editingKey: '' })}
                  icon={<CloseOutlined />}
                >Cancel</Button>
              </span>
            ) : (
              <span>
                <Button
                  type="primary"
                  onClick={() => this.onEdit(record)}
                  className="edit-btn green-btn"
                  icon={<EditOutlined />}
                >Edit</Button>
                <Popconfirm
                  title="Are you sure that you want to delete this user?"
                  onConfirm={() => this.onDelete(record)}
                >
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                  >Delete</Button>
                </Popconfirm>
              </span>
            );
          } else if (value === 'active') {
            if (content) {
              return (
                <CheckOutlined className="check-icon-custom" />
              );
            } else {
              return (
                <CloseOutlined className="close-icon-custom" />
              );
            }
          } else {
            return content;
          }
         }
      });
    });
  }

  usersForm = React.createRef();

  /**
   * @description Handles some actions on component mount
   * @returns {void}
   */
  componentDidMount() {
    const { onFetchUsers } = this.props;

    setTimeout(() => {
      onFetchUsers();
    }, 1000);
  }

  /**
   * @description Updates component
   * @param {Object} prevProps
   * @param {Object} prevState
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    const { usersList } = this.props;
    if ((prevProps.usersList.length === 0 && usersList.length > 0)) {
      this.setState({ users: usersList, usersAll: usersList });
    }

    if (prevProps.usersList !== usersList) {
      this.setState({ users: usersList, usersAll: usersList });
    }
  }

  /**
   * @description Adapts table headers
   * @param {Sgtring} value
   * @returns {String}
   */
  adaptTableHeaders = (value) => {
    let headerLabel;
    switch (value) {
      case 'first_name':
        headerLabel = 'First Name';
        break;
      case 'last_name':
        headerLabel = 'Last Name';
        break;
      case 'email':
        headerLabel = 'Email';
        break;
      case 'active':
        headerLabel = 'Active';
        break;
      case 'country':
        headerLabel = 'Country';
        break;
      case 'city':
        headerLabel = 'City';
        break;
      case 'action':
        headerLabel = 'Action';
        break;
      default:
        headerLabel = value;
    }

    return headerLabel;
  }

  /**
   * @description Check if editing a row
   * @param {Object} record
   * @returns {boolean}
   */
  isEditing = (record) => {
    const { editingKey } = this.state;
  
    return record.id === editingKey;
  };

  /**
   * @description Handles edit table
   * @param {Object} record
   * @returns {void}
   */
  onEdit = (record) => {
    this.usersForm.current.setFieldsValue({
      first_name: record.first_name,
      last_name: record.last_name,
      email: record.email,
      city: record.city,
      country: record.country,
      ...record,
    });

    this.setState({
      editingKey: record.id,
      isUpdateSaved: false,
    });
  }

  /**
   * @description Handles save
   * @param {Number} id
   * @returns {void}
   */
  onSave = (id) => {
    const { updateUser, onFetchUsers } = this.props;
    const { users } = this.state;
    const user = this.usersForm.current.getFieldsValue();
    const findUser = users.find((user) => user.id === id);
    const mergedUser = { ...findUser, ...user };

    updateUser(id, mergedUser);

    users.splice(findUser, 1, mergedUser);

    this.setState({
      editingKey: '',
      isUpdateSaved: true,
      users,
    }, () => setTimeout(() => {
      onFetchUsers();
    }, 1000));
    
  }

  /**
   * @description Handles onDelete
   * @param {Object} user
   * @returns {void}
   */
  onDelete = (user) => {
    const { deleteUser } = this.props;
    const { users } = this.state;
    const filteredUsers = users.filter((u) => u.id !== user.id);

    deleteUser(user);

    this.setState({ users: filteredUsers });
  }

  /**
   * @description Navigates to add form
   * @returns {void}
   */
  navigateToAddUser = () => {
    const { history } = this.props;

    history.push('/users/add')
  }

  /**
   * @description Add filters in state object
   * @param {String} field
   * @param {String} value
   * @returns {void}
   */
  addFilters = (field, value) => {
    const { filterCriteria } = this.state;

    switch (field) {
      case 'first_name':
        this.setState({
          filterCriteria: { ...filterCriteria, firstName: value }
        });
        break;
      case 'last_name':
        this.setState({
          filterCriteria: { ...filterCriteria, lastName: value }
        });
        break;
      case 'email':
        this.setState({
          filterCriteria: { ...filterCriteria, email: value }
        });
        break;
      case 'city':
        this.setState({
          filterCriteria: { ...filterCriteria, city: value }
        });
        break;
      case 'country':
        this.setState({
          filterCriteria: { ...filterCriteria, country: value }
        });
        break;
      default: break;
    }
  }

  /**
   * @description Handles serach on table
   * @param {Object} e
   * @returns {void}
   */
  handleSearch = (e) => {
    const { value, id } = e.target;

    this.addFilters(id, value);

    setTimeout(() => {
      const { usersAll, filterCriteria } = this.state;
      let filtered = usersAll;

      filtered = usersAll.filter(
        (user) => user.first_name.toLowerCase().includes(filterCriteria.firstName.toLowerCase())
          && user.last_name.toLowerCase().includes(filterCriteria.lastName.toLowerCase())
          && user.email.toLowerCase().includes(filterCriteria.email.toLowerCase())
          && user.city.toLowerCase().includes(filterCriteria.city.toLowerCase())
          && user.country.toLowerCase().includes(filterCriteria.country.toLowerCase()),
      );

      this.setState({ users: filtered });
    }, 1000);
  }

  handleSorting = (user1, user2, value) => {
    switch (value) {
      case 'first_name':
        return user1.first_name.localeCompare(user2.first_name);
      case 'last_name':
        return user1.last_name.localeCompare(user2.last_name);
      case 'email':
        return user1.email.localeCompare(user2.email);
      case 'city':
        return user1.city.localeCompare(user2.city);
      case 'country':
        return user1.country.localeCompare(user2.country);
      
      default: break;
    }
  }

  render() {
    const { users } = this.state;
    const { loading } = this.props;
    const mergedColumns = this.columns.map((column) => {
      if (!column.editable) {
        return column;
      }

      return {
        ...column,
        onCell: (record) => ({
          record,
          dataIndex: column.dataIndex,
          title: column.title,
          editing: this.isEditing(record),
        }),
      };
    });
  
    return (
      <div>
        <Header />
        <div className="main-content-wrapper">
          <div className="add-user-btn">
            <Button
              onClick={() => this.navigateToAddUser()}
              className="green-btn"
              icon={<UserAddOutlined />}
            >Add User</Button>
          </div>
          <Form
            ref={this.usersForm}
          >
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              columns={mergedColumns}
              dataSource={users}
              bordered
              loading={loading}
            />
          </Form>
        </div>
      </div>
    );
  }
}

Users.defaultProps = {
  usersList: [],
  history: {},
  loading: false,
};

Users.propTypes = {
  usersList: PropTypes.array,
  updateUser: PropTypes.func,
  onFetchUsers: PropTypes.func,
  deleteUser: PropTypes.func,
  history: PropTypes.shape(),
  loading: PropTypes.bool,
};

const mapStateToProps = ({ usersReducer }) => {
  const { usersList, loading } = usersReducer;

  return { usersList, loading };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchUsers: () => dispatch(onFetchUsersRequest()),
  updateUser: (id, user) => dispatch(onUpdateUserRequest(id, user)),
  deleteUser: (user) => dispatch(onDeleteUserRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
  