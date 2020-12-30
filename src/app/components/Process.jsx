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
          {/* <span className="tagLabel">Tags: </span> */}
          <div className="cssLayer"></div>
          <div class="borderLeft">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="tagsContainer">{tags}</div>
          <div class="borderRight">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="detailContainer">
          <span className="processCategoryLabel">{this.props.data.category}</span>
          {/* <div className="break"></div> */}
          <div className="detailButtonContainer">
            <button onClick={this.updateProcess} role="edit" title="edit" alt="edit process" className="processEditButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <button onClick={this.deleteProcess} role="delete" title="delete" alt="delete process" className="processDeleteButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>
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
