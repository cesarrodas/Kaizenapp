import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  
  requestReplayCreate,
  requestReplayUpdate,
  requestReplayDelete,
  selectedReplayIndex,
  updateReplayPage
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
    this.previousReplay = this.previousReplay.bind(this);
  }

  componentDidUpdate(prevProps){

    if(prevProps.replayPage.selectedReplayIndex !== this.props.replayPage.selectedReplayIndex){

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
      hypothesis: this.state.hypothesis,
      experiment: this.state.experiment,
      analysis: this.state.analysis,
      conclusion: this.state.conclusion,
      process: this.props.replayPage.selectedProcess._id,
      creator: this.props.auth.userData._id
    }

    console.log("new data", newReplay);

    this.props.requestReplayCreate(newReplay);
  }

  updateReplay(){
    console.log("we are updating.");
    console.log("selected index Replay: ", this.props.replays.replays[this.state.selectedReplayIndex]);

    const newReplay = {
      hypothesis: this.state.hypothesis,
      experiment: this.state.experiment,
      analysis: this.state.analysis,
      conclusion: this.state.conclusion,
      process: this.props.replayPage.selectedProcess._id,
      creator: this.props.auth.userData._id,
      _id: this.props.replays.replays[this.state.selectedReplayIndex]._id
    }

    console.log("new data on update", newReplay);

    this.props.requestReplayUpdate(newReplay);
  }

  previousReplay(){
    if(this.props.replays.replays[this.state.selectedReplayIndex + 1]){
      this.props.selectedReplayIndex(this.state.selectedReplayIndex + 1);
      // this.setState({
      //   selectedReplayIndex: this.state.selectedReplayIndex + 1
      // });
    }
  }
  
  render(){
    const date = new Date();
    const setDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` 
    console.log("replays",this.props.replays);

    const prevButton = this.props.replays.replays[this.state.selectedReplayIndex + 1] ? 
      <button className="prevButton" onClick={this.previousReplay}>Prev</button> : null;

    const button = this.props.replays.replays.length ? 
      <button className="replayUpdateButton" onClick={this.updateReplay}>Update</button> : 
      <button className="replayCreateButton" onClick={this.createReplay}>Create</button>;

    return (
      <div className="span6">
        <div className="replayPage">
          <h4><label>Process</label></h4>
          <p className="processBanner">{this.props.replayPage.selectedProcess.process}</p>
          <p className="replayDate"><i>{setDate}</i></p>
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
            {prevButton}
            {button}
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
  updateReplayPage
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Replay);
