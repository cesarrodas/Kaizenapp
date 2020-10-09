import React from 'react';
import Process from './Process';
import ProcessModal from './ProcessModal';

class Dashboard extends React.Component {

  constructor(){
    super();

    this.openAddProcessModal = this.openAddProcessModal.bind(this);
    this.openEditProcessModal = this.openEditProcessModal.bind(this);
    this.openDeleteProcessModal = this.openDeleteProcessModal.bind(this);
    this.closeAddProcessModal = this.closeAddProcessModal.bind(this);
    this.closeEditProcessModal = this.closeEditProcessModal.bind(this);
    this.closeDeleteProcessModal = this.closeDeleteProcessModal.bind(this);
    this.deleteProcess = this.deleteProcess.bind(this);
  }

  openAddProcessModal(){
    this.props.showProcessModal(true);
  }

  closeAddProcessModal(){
    this.props.showProcessModal(false);
  }

  openEditProcessModal(){
    this.props.showProcessEditModal(true);
  }

  closeEditProcessModal(){
    this.props.showProcessEditModal(false);
  }

  openDeleteProcessModal(){
    this.props.showProcessDeleteModal(true);
  }

  closeDeleteProcessModal(){
    this.props.showProcessDeleteModal(false);
  }

  deleteProcess(){
    const id = this.props.appStatus.processDeletable;
    //console.log(this.props.appStatus);
    this.props.requestProcessDelete(id);
  }

  render() {
    //console.log("data in dashboard: ", this.props.data);
    let processes = null;
    if(this.props.data.processes){
      processes = this.props.data.processes.map((item) => {
        return (
          <Process 
            key={item._id} 
            data={item} 
            openEditModal={this.openEditProcessModal} 
            openDeleteProcessModal={this.openDeleteProcessModal}
            updateProcessForm={this.props.updateProcessForm}
            updateProcessDeletable={this.props.updateProcessDeletable}
          />);
      });
    }

    let modal = null;
    if(this.props.appStatus.showProccessModal){
      modal = (<ProcessModal edit={false} delete={false} closeModal={this.closeAddProcessModal}/>);
    } else if (this.props.appStatus.showProcessEditModal){
      modal = (<ProcessModal edit={true} delete={false} closeModal={this.closeEditProcessModal}/>);
    } else if (this.props.appStatus.showProcessDeleteModal){
      modal = (<ProcessModal edit={false} delete={true} deleteProcess={this.deleteProcess} closeModal={this.closeDeleteProcessModal} />);
    }
    
    return (
      <div className="span8">
        <h1>Your Processes</h1>
        <div className="processesContainer">
          {processes}
        </div>
        <button id="addProcess" onClick={this.openAddProcessModal}>New Process</button>
        {modal}
      </div>
    );
  }
}

export default Dashboard;