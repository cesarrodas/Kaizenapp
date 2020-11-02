import React from 'react';
import Process from './Process';
import ProcessModal from './ProcessModal';
import { connect } from 'react-redux';
import { openCreateProcessModal } from '../state/actions/actions';


class Dashboard extends React.Component {

  render() {
    let processes = null;
    if(this.props.data.processes){
      processes = this.props.data.processes.map((item) => {
        return (
          <Process 
            key={item._id} 
            data={item}
          />);
      });
    }

    let modal = null;
    if(this.props.processModal.open){
      modal = (<ProcessModal />);
    }
    
    return (
      <div className="span8">
        <h1 className="processesBanner">Your Processes</h1>
        <div className="processesContainer">
          {processes}
        </div>
        <button id="addProcess" onClick={this.props.openCreateProcessModal}>New Process</button>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  processModal: state.processModal
});

const mapDispatchToProps = {
  openCreateProcessModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);