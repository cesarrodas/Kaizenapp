import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  openUpdateProcessModal, 
  openDeleteProcessModal,
  updateProcessForm,
  setProcessDeletable,
  requestReplays,
  updateSelectedProcess,
  selectedReplayIndex
} from '../state/actions/actions';

class Process extends React.Component {
  constructor(){
    super();
    this.deleteProcess = this.deleteProcess.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
    this.goToReplays = this.goToReplays.bind(this);
  }

  componentDidMount(){
    console.log("Process props: ", this.props);
  }

  deleteProcess(){
    //console.log("delete process");
    //this.props.requestProcessDelete(this.props.data._id);
    //console.log("deleted if by magic");
    console.log("on delete", this.props.data._id);
    this.props.setProcessDeletable(this.props.data._id);
    this.props.openDeleteProcessModal();
  }

  updateProcess(){
    //console.log("update process");
    console.log("editing data before modal: ", this.props.data);
    this.props.updateProcessForm(this.props.data);
    //this.props.requestProcessEdit(this.props.data);
    this.props.openUpdateProcessModal();
  }

  goToReplays(){
    this.props.updateSelectedProcess(this.props.data);
    this.props.selectedReplayIndex(null);
    this.props.requestReplays(this.props.data._id);
    this.props.history.push('/replays');
  }

  render () {
    const tags = this.props.data.tags.map((tag, index) => {
      return <span className="processTag" key={index}>{tag}</span>
    });

    return (
      <div className="processContainer">
        <p className="processTask" onClick={this.goToReplays} >{this.props.data.process}</p>
        <div className="processTags">
          <span className="tagLabel">Tags: </span>
          <div className="tagsContainer">{tags}</div>
        </div>
        <div className="detailContainer">
          <button onClick={this.updateProcess} className="processEditButton">Edit</button>
          <button onClick={this.deleteProcess} className="processDeleteButton">Delete</button>
          <div className="break"></div>
          <span className="processCategoryLabel">{this.props.data.category}</span>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  openUpdateProcessModal,
  openDeleteProcessModal,
  updateProcessForm,
  setProcessDeletable,
  requestReplays,
  updateSelectedProcess,
  selectedReplayIndex
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Process);
