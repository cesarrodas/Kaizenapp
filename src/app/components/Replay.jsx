import React from 'react';
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
    this.createPrevButton = this.createPrevButton.bind(this);
    this.createNextButton = this.createNextButton.bind(this);
    this.createDateDisplay = this.createDateDisplay.bind(this);
    this.backToProcesses = this.backToProcesses.bind(this);
  }

  componentDidUpdate(prevProps){

    if(prevProps.replays.replays.length > 0 && this.props.replays.replays.length == 0) {
      this.props.resetReplayPage();
    }

    if(prevProps.replays.replays[prevProps.selectedReplayIndex] !== this.props.replays.replays[this.props.selectedReplayIndex]){
      let replay = this.props.replays.replays[this.props.selectedReplayIndex];
      this.setState({
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

    //console.log("new data", newReplay);

    this.props.requestReplayCreate(newReplay);
  }

  updateReplay(){
    console.log("we are updating.");

    const newReplay = {
      hypothesis: this.state.hypothesis,
      experiment: this.state.experiment,
      analysis: this.state.analysis,
      conclusion: this.state.conclusion,
      process: this.props.replayPage.selectedProcess._id,
      creator: this.props.auth.userData._id,
      _id: this.props.replays.replays[this.state.selectedReplayIndex]._id
    }

    this.props.requestReplayUpdate(newReplay);
  }

  createPrevButton(){
    if(this.props.replays.replays[this.state.selectedReplayIndex + 1]){
      const nextReplay = this.props.replays.replays[this.state.selectedReplayIndex + 1];
      const prevReplayHandler = () => {
        this.props.selectedReplayIndex(this.state.selectedReplayIndex + 1);
      }
      const createDateObject = new Date(nextReplay.createdAt);
      const dateFormat = `${createDateObject.getMonth() + 1}/${createDateObject.getDate()}/${createDateObject.getFullYear()}`;
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
      const dateFormat = `${createDateObject.getMonth() + 1}/${createDateObject.getDate()}/${createDateObject.getFullYear()}`;
      return <button className="nextButton" onClick={nextReplayHandler}>{dateFormat}</button>;
    }
    return null;
  }

  createDateDisplay(){
    if(this.props.replays.replays[this.state.selectedReplayIndex]){
      let date = new Date(this.props.replays.replays[this.state.selectedReplayIndex].createdAt);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    } 
    let date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  backToProcesses () {
    this.props.history.push('/dashboard');
  }
  
  render(){
    const setDate = this.createDateDisplay();

    console.log("SELECTED REPLAY INDEX: ", this.state.selectedReplayIndex);

    const prevButton = this.createPrevButton();

    const nextButton = this.createNextButton();

    const button = <button className="replayUpdateButton" onClick={this.updateReplay}>Save</button>;
      
    const createButton = this.state.selectedReplayIndex == 0 || this.props.replays.replays.length == 0 ? 
      <button className="replayCreateButton" onClick={this.createReplay}>New Page</button> : null;

    return (
      <div className="span6">
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
          {/* <button className="saveButton" type="button">Save</button> */}
          <div className="buttonContainer">
            {button}
          </div>
          <hr/>
          <div className="buttonContainer"> 
            <button className="processesButton" onClick={this.backToProcesses}>Processes</button>
            {createButton}
          </div>
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
