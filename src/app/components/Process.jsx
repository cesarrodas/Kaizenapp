import React from 'react';
import { connect } from 'react-redux';
import { requestProcessDelete, requestProcessEdit, updateProcessForm } from '../state/actions/actions';

class Process extends React.Component {
  constructor(){
    super();
    this.deleteProcess = this.deleteProcess.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
  }

  deleteProcess(){
    //console.log("delete process");
    this.props.requestProcessDelete(this.props.data._id);
  }

  updateProcess(){
    //console.log("update process");
    this.props.updateProcessForm(this.props.data);
    //this.props.requestProcessEdit(this.props.data);
    this.props.openEditModal();
  }

  render () {
    const tags = this.props.data.tags.map((tag, index) => {
      return <div className="processTag" key={index}>{tag}</div>
    });

    return (
      <div className="processContainer">
        <p>{this.props.data.process}</p>
        {tags}
        <button onClick={this.updateProcess} className="processEditButton">Edit</button>
        <button onClick={this.deleteProcess} className="processDeleteButton">Delete</button>
      </div>
    )
  }
}

const mapDispatchToProps = { requestProcessDelete, requestProcessEdit, updateProcessForm }

export default connect(null, mapDispatchToProps)(Process);