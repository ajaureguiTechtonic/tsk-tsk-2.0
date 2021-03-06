import React, { Component } from 'react';
import TaskList from '../../../src/components/taskContainer/taskList';
const store = require('store');
const taskURL = 'http://127.0.0.1:4000/tsktsk';
const axios = require('axios');

class ArchivedTaskView extends Component{
  constructor (props) {
    super(props);

    this.state = {
      taskList: [],
    };

    this.checkStorage = this.checkStorage.bind(this);
    this.checkStorage();
  };

  checkStorage() {
    if (this.props.isLoggedIn === true) {
      console.log('checking storage');
      let headers = {
        'x-access-token': sessionStorage.getItem('jwt-token'),
        'pathname': this.props.location.pathname,
      };
      axios.get(taskURL, { headers: headers })
      .then((response) => {
        this.storageTasks = response.data;
        this.setState({
          taskList: response.data,
        });
      });
    } else {
      console.log('not able to bruh');
    }
  };

  render() {

    store.set('storedTasks', this.state.taskList);
    return (
       <div>
        <nav></nav>
        <TaskList taskList={this.state.taskList}/>
      </div>
    );
  }
};

export default ArchivedTaskView;
