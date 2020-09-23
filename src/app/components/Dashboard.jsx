import React from 'react';
import ProcessModal from './ProcessModal';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      showProccessModal: false
    }

    this.addProcessClick = this.addProcessClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  addProcessClick(){
    this.setState({
      showProccessModal: true
    });
  }

  closeModal(){
    this.setState({
      showProccessModal: false
    });
  }

  render() {
    return (
      <div className="span12">
        <h1>Your Processes</h1>
        <button id="addProcess" onClick={this.addProcessClick}>New</button>
        {
          this.state.showProccessModal ? (
            <ProcessModal closeModal={this.closeModal}/>
          ) : null
        }
      </div>
    );
  }
}

export default Dashboard;