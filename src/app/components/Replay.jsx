import React from 'react';

class Replay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hypothesis: this.props.replayPage.hypothesis,
      experiment: this.props.replayPage.experiment,
      analysis: this.props.replayPage.analysis,
      conclusion: this.props.replayPage.conclusion
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
    this.props.updateReplayPage({
      [event.target.name] : event.target.value
    });
  }
  
  render(){

    return (
      <div className="span6">
        <div className="replayPage">
          <h2>{this.props.replayPage.selectedProcess}</h2>
          <h3><label htmlFor="hypothesis">Hypothesis</label></h3>
          <textarea name="hypothesis" value={this.state.hypothesis} onChange={this.handleChange}></textarea><br/>
          <h3><label htmlFor="experiment">Experiment</label></h3>
          <textarea name="experiment" value={this.state.experiment} onChange={this.handleChange}></textarea><br/>
          <h3><label htmlFor="analysis">Analysis</label></h3>
          <textarea name="analysis" value={this.state.analysis} onChange={this.handleChange}></textarea><br/>
          <h3><label htmlFor="conclusion">Conclusion</label></h3>
          <textarea name="conclusion" value={this.state.conclusion} onChange={this.handleChange}></textarea><br/>
        </div>
        <button>Save</button>
      </div>
    )
  }
}

export default Replay;
