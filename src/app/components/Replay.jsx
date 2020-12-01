import React from 'react';
import DOMPurify from 'dompurify';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  
  requestReplayCreate,
  requestReplayUpdate,
  requestReplayDelete,
  selectedReplayIndex,
  updateReplayPage,
  resetReplayPage
} from '../state/actions/actions';

class Replay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hypothesis: this.props.replayPage.hypothesis,
      experiment: this.props.replayPage.experiment,
      analysis: this.props.replayPage.analysis,
      conclusion: this.props.replayPage.conclusion,
      selectedReplayIndex: this.props.replayPage.selectedReplayIndex
    }
    this.handleChange = this.handleChange.bind(this);
    this.createReplay = this.createReplay.bind(this);
    this.updateReplay = this.updateReplay.bind(this);
    this.deleteReplay = this.deleteReplay.bind(this);
    this.createPrevButton = this.createPrevButton.bind(this);
    this.createNextButton = this.createNextButton.bind(this);
    this.createDateDisplay = this.createDateDisplay.bind(this);
    this.backToProcesses = this.backToProcesses.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidUpdate(prevProps){

    if(prevProps.replays.replays.length > 0 && this.props.replays.replays.length == 0) {
      this.props.resetReplayPage();
    }
    
    if(prevProps.replays.replays[prevProps.replayPage.selectedReplayIndex] !== this.props.replays.replays[this.props.replayPage.selectedReplayIndex]){
      let replay = this.props.replays.replays[this.props.replayPage.selectedReplayIndex];
      this.props.updateReplayPage({
        hypothesis: replay.hypothesis,
        experiment: replay.experiment,
        analysis: replay.analysis,
        conclusion: replay.conclusion
      });
    }

    if(prevProps.replayPage.selectedReplayIndex !== this.props.replayPage.selectedReplayIndex){
      this.setState({
        selectedReplayIndex: this.props.replayPage.selectedReplayIndex
      });

      if(this.props.replays.replays[this.props.replayPage.selectedReplayIndex]){
        const replay = this.props.replays.replays[this.props.replayPage.selectedReplayIndex];
        this.props.updateReplayPage({
          hypothesis: replay.hypothesis,
          experiment: replay.experiment,
          analysis: replay.analysis,
          conclusion: replay.conclusion
        });
      }
    }

    if(prevProps.replayPage !== this.props.replayPage){
      this.setState({
        hypothesis: this.props.replayPage.hypothesis,
        experiment: this.props.replayPage.experiment,
        analysis: this.props.replayPage.analysis,
        conclusion: this.props.replayPage.conclusion 
      });
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
    this.props.updateReplayPage({
      [event.target.name] : event.target.value
    });
  }

  createReplay(){

    const newReplay = {
      hypothesis: "",
      experiment: "",
      analysis: "",
      conclusion: "",
      process: this.props.replayPage.selectedProcess._id,
      creator: this.props.auth.userData._id
    }

    this.props.requestReplayCreate(newReplay);
  }

  updateReplay(){
    const newReplay = {
      hypothesis: DOMPurify.sanitize(this.state.hypothesis),
      experiment: DOMPurify.sanitize(this.state.experiment),
      analysis: DOMPurify.sanitize(this.state.analysis),
      conclusion: DOMPurify.sanitize(this.state.conclusion),
      process: this.props.replayPage.selectedProcess._id,
      creator: this.props.auth.userData._id,
      _id: this.props.replays.replays[this.state.selectedReplayIndex]._id
    }

    this.props.requestReplayUpdate(newReplay);
  }

  deleteReplay(){
    const payload = {
      _id: this.props.replays.replays[this.state.selectedReplayIndex]._id,
      process: this.props.replayPage.selectedProcess._id
    }

    this.props.requestReplayDelete(payload);
  }

  formatDate(date){
    let hours = date.getHours();
    let day = "AM"
    if(date.getHours() > 12){
      hours = date.getHours() - 12;
      day = "PM"
    }
    let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${hours}:${minutes} ${day}`;
  }

  createPrevButton(){
    if(this.props.replays.replays[this.state.selectedReplayIndex + 1]){
      const nextReplay = this.props.replays.replays[this.state.selectedReplayIndex + 1];
      const prevReplayHandler = () => {
        this.props.selectedReplayIndex(this.state.selectedReplayIndex + 1);
      }
      const createDateObject = new Date(nextReplay.createdAt);
      const dateFormat = this.formatDate(createDateObject);
      return <button className="prevButton" onClick={prevReplayHandler}>{dateFormat}</button>;
    }
    return null;
  }



  createNextButton(){
    if(this.props.replays.replays[this.state.selectedReplayIndex - 1]){
      const nextReplay = this.props.replays.replays[this.state.selectedReplayIndex - 1];
      const nextReplayHandler = () => {
        this.props.selectedReplayIndex(this.state.selectedReplayIndex - 1);
      }
      const createDateObject = new Date(nextReplay.createdAt);
      const dateFormat = this.formatDate(createDateObject);

      return <button className="nextButton" onClick={nextReplayHandler}>{dateFormat}</button>;
    }
    return null;
  }

  createDateDisplay(){
    if(this.props.replays.replays[this.state.selectedReplayIndex]){
      let date = new Date(this.props.replays.replays[this.state.selectedReplayIndex].createdAt);
      return this.formatDate(date);
    } 
    let date = new Date();
    return this.formatDate(date);
  }

  backToProcesses () {
    this.props.history.push('/dashboard');
  }
  
  render(){
    const setDate = this.createDateDisplay();

    const prevButton = this.createPrevButton();

    const nextButton = this.createNextButton();

    const button = <button className="replayUpdateButton" onClick={this.updateReplay}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
    </button>;
      
    const createButton = this.state.selectedReplayIndex == 0 || this.props.replays.replays.length == 0 ? 
      <button className="replayCreateButton" onClick={this.createReplay}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/></svg>
      </button> : null;

    const deleteButton = this.props.replays.replays.length > 1 ? 
      <button className="replayDeleteButton" onClick={this.deleteReplay}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button> : null;

    return (
      <div className="replayPage">
        <h4><label>Process</label></h4>
        <p className="processBanner">{this.props.replayPage.selectedProcess.process}</p>
        <div className="buttonContainer">
          {prevButton}
          {nextButton}
          <p className="replayDate"><i>{setDate}</i></p>
        </div>
        <h4><label htmlFor="hypothesis">Hypothesis</label></h4>
        <textarea name="hypothesis" value={this.state.hypothesis} onChange={this.handleChange}></textarea><br/>
        <h4><label htmlFor="experiment">Experiment</label></h4>
        <textarea name="experiment" value={this.state.experiment} onChange={this.handleChange}></textarea><br/>
        <h4><label htmlFor="analysis">Analysis</label></h4>
        <textarea name="analysis" value={this.state.analysis} onChange={this.handleChange}></textarea><br/>
        <h4><label htmlFor="conclusion">Conclusion</label></h4>
        <textarea name="conclusion" value={this.state.conclusion} onChange={this.handleChange}></textarea><br/>
        <div className="buttonContainer">
          {deleteButton}
          {button}
        </div>
        <hr/>
        <div className="buttonContainer"> 
          <button className="processesButton" onClick={this.backToProcesses}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/></svg></button>
          {createButton}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  replays: state.replays,
  replayPage: state.replayPage,
  auth: state.auth
});

const mapDispatchToProps = {
  requestReplayCreate,
  requestReplayUpdate,
  requestReplayDelete,
  selectedReplayIndex,
  updateReplayPage,
  resetReplayPage
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Replay);
