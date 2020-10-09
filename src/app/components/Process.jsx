import React from 'react';

class Process extends React.Component {
  constructor(){
    super();
    this.deleteProcess = this.deleteProcess.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
  }

  deleteProcess(){
    //console.log("delete process");
    //this.props.requestProcessDelete(this.props.data._id);
    //console.log("deleted if by magic");
    this.props.updateProcessDeletable(this.props.data._id);
    this.props.openDeleteProcessModal();
  }

  updateProcess(){
    //console.log("update process");
    console.log("editing data before modal: ", this.props.data);
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

export default Process;