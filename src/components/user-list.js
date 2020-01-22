import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap';
import UserItem from './user-item'

// import styles from '../styles.css'

class UserListComponent extends Component {
  render() {
    const {
      text,
      users
    } = this.props

    return (
      <ListGroup>
        {
          Object.entries(users).map(
            (data) => <UserItem key={data[0]} user={data[1]}></UserItem>
          )
        }
      </ListGroup>)
  }
}

UserListComponent.propTypes = {
  text: PropTypes.string
};

const mapStateToProps = state => ({
  users: state.fleet.users
})
const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent)