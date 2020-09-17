import React from 'react';
import Modal from './Modal';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      showProccessModal: false
    }
    this.addProcessClick = this.addProcessClick.bind(this);
  }

  addProcessClick(){
    this.setState({
      showProccessModal: true
    });
  }

  render() {
    return (
      <div className="span12">
        <h1>Your Processes</h1>
        <button id="addProcess" onClick={this.addProcessClick}>New</button>
        {
          this.state.showProccessModal ? (
            <Modal>
              <h1>Modal</h1>
              <button>Close</button>
              <button>Submit</button>  
            </Modal>
          ) : null
        }
      </div>
    );
  }
}

export default Dashboard;