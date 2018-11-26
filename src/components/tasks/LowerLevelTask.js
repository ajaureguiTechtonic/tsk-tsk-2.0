import React, { Component } from 'react';
import editButton from '../../assets/edit.png';
import './alltasks.css';
import './lowerlevel.css';
import { Collapse } from 'reactstrap';

class LowerLevelTask extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isCollapsed: false,
      editing: false,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);

  };

  toggleCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  };

  //// TODO:
  // have edit button txt changed to done, when edit is clicked.
  //have edit button toggle "edit mode"
  // Create 'editmode' where the name, date, description fields become editable.
  // lower level task should be easy to implement, HigherLevelTask will require some more intensive editing to the task div to accomadate a date field/DatePicker
  // decide if editmode should be imported in from task container or if it will need to be customised per level

  editModaLLT() {
    // example p tag for name <p className="m-0 align-self-center">{this.props.taskName}</p>
    // need to empty out the ptag and replace ? or hide so that an edit field can take its place.
    // created ref called name nameDiv
    //need to access nameDiv and clear out the ptag or just the txt in it.
    // the task id will be required or some reference to self.
    // // TODO: need an edit on/off type bool state
    // date is broke out into two paragraphs, this will make things trickier,
    //description p is classless.


    let editBtn = this.refs.editBtn;
    let nameP = this.refs.nameP;
    let contentName = this.props.taskName;

//// TODO:  function layout
    if (!this.state.editing) {
      editBtn.innerHTML = 'Done';

      // // NOTE: set inline styling to a more perm solution in a .css file.
      nameP.innerHTML = '<textarea className="removeMeLLT" style="width: 40vw; height: 5vh; resize: none; background: none; border: 1px solid black; border-radius: 5px;">' +  contentName + '</textarea>';
      
    } else {

      editBtn.innerHTML = 'Edit';
      console.log('is editing true already');
    }


      this.setState({
        editing: !this.state.editing,
      });
  }

  render() {
    if (this.props.dueDate === undefined) {
      var month = this.props.daysOld;
      var day = 'Days Old';
    } else {
      var dueDate = (this.props.dueDate).split(' ');
      month = dueDate[1];
      day = dueDate[2];
    };

    return (
        <div>
          <div id={this.props.id} className="container task">
            <div className="row">
              <div className={`col-12 col-md-10 offset-1 task-content level-${this.props.level}`}>
                <div className="row">
                  <div className="col-2 col-md-1 justify-content-center complete-box my-auto ">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </div>
                  <div className="col-7 col-md-9 d-flex" onTouchStart={this.toggleCollapse}>
                    <p className="m-0 align-self-center" ref="nameP">{this.props.taskName}</p>
                  </div>
                  <div className="col-3 col-md-2 d-flex justify-content-center">
                    <div className="align-self-center text-center days-old-count">
                      <p className="m-0">{month}</p>
                      <p className="m-0 days-old">{day}</p>
                    </div>
                  </div>
                  <Collapse className="col-12 col-md-10 offset-1" isOpen={this.state.isCollapsed} >
                    <div className="row">
                      <div className={`col-10 col-sm-7 task-description edit-this-task-${this.props.taskID}`}>
                        <p>{this.props.description}</p>
                      </div>
                      <div className={`col-12 col-sm-4 edit-this-task-${this.props.taskID}`}>
                        <div className="edit-content btn-group" role="group" aria-label="edit buttons">
                          <button type="button" className="btn edit-button listen-for-me-edit-task" ref="editBtn" onClick={(e) => {
                            // this.props.handleOnEdit(this.props.id);
                            this.editModaLLT();
                          }}>Edit</button>
                          <button type="button" className="btn edit-button listen-for-me-delete-task" onClick={(e) => {
                            this.props.handleOnDelete(this.props.id);
                          }}> Delete </button>

                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
              <div className="col-1 edit-container edit-icon d-none d-sm-none d-md-block">
                <img src={editButton} alt='' onClick={this.toggleCollapse} />
              </div>
            </div>
          </div>
        </div>
      );
  };
}

export default LowerLevelTask;
