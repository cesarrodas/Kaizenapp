import React from 'react';
import Process from './Process';
import ProcessModal from './ProcessModal';

class Dashboard extends React.Component {

  constructor(){
    super();

    this.openAddProcessModal = this.openAddProcessModal.bind(this);
    this.openEditProcessModal = this.openEditProcessModal.bind(this);
    this.closeAddProcessModal = this.closeAddProcessModal.bind(this);
    this.closeEditProcessModal = this.closeEditProcessModal.bind(this);
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

  render() {
    console.log("data in dashboard: ", this.props.data);
    const processes = this.props.data.processes.map((item) => {
      return (<Process key={item._id} data={item} openEditModal={this.openEditProcessModal} />);
    });

    let modal = null;
    if(this.props.appStatus.showProccessModal){
      modal = (<ProcessModal edit={false} closeModal={this.closeAddProcessModal}/>);
    } else if (this.props.appStatus.showProcessEditModal){
      modal = (<ProcessModal edit={true} closeModal={this.closeEditProcessModal}/>);
    }
    
    return (
      <div className="span8">
        <h1>Your Processes</h1>
        <div className="processesContainer">
          {processes}
        </div>
        <button id="addProcess" onClick={this.openAddProcessModal}>New</button>
        {modal}
      </div>
    );
  }
}

export default Dashboard;