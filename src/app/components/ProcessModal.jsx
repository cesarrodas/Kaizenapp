import React from 'react';
import { connect } from 'react-redux';
import { 
  updateProcessForm,
  requestProcessCreation, 
  requestProcessUpdate, 
  closeProcessModal,
  requestProcessDelete
} from '../state/actions/actions';
import Modal from './Modal';
import { modes } from '../state/reducers/processModal';
import { CSSTransition } from 'react-transition-group';
import TagInput from './TagInput';

class ProcessModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalBackgroundAnimation: true,
      modalAnimation: true, // I need to add the state back in here. 
      process: this.props.processForm.process,
      category: this.props.processForm.category,
      tags: this.props.processForm.tags,
      creator: this.props.auth.userData._id
    }
    this.closeModalAnimation = this.closeModalAnimation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeTags = this.changeTags.bind(this);
    this.modalContent = this.modalContent.bind(this);
    this.createProcess = this.createProcess.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
    this.deleteProcess = this.deleteProcess.bind(this);
  }

  componentDidUpdate() {
    if(this.props.processModal.animatingClose){
      this.closeModalAnimation();
    }
  }

  closeModalAnimation(){
    this.setState({
      modalBackgroundAnimation: false,
      modalAnimation: false
    });
    setTimeout(() => {
      this.props.closeProcessModal();
    }, 300);
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.updateProcessForm({
        process: this.state.process,
        category: this.state.category,
        creator: this.state.creator
      });
    });
  }

  changeTags(tags){
    this.setState({
      tags: tags
    }, () => {
      this.props.updateProcessForm({
        tags: tags
      });
    });
  }

  createProcess(){
    const newProcess = {};
    newProcess.process = this.props.processForm.process;
    newProcess.category = this.props.processForm.category;
    newProcess.creator = this.props.processForm.creator;
    newProcess.tags = this.props.processForm.tags;

    this.props.requestProcessCreation(newProcess);
  }

  updateProcess(){
    this.props.requestProcessUpdate(this.props.processForm);
  }

  deleteProcess(){
    const processId = this.props.processModal.deletableId;
    this.props.requestProcessDelete(processId);
  }

  modalContent(){
    console.log("modal Content", this.props.processModal);
    if(this.props.processModal.mode == modes.DELETE){
      return (
        <div className="modal processModal">
          <h2>Delete</h2>
          <p>Are you sure you want to delete this process? </p>
          <div className="buttonContainer">
            <button className="cancelDeleteProcess" onClick={this.closeModalAnimation}>Cancel</button>
            <button className="confirmDeleteProcess" onClick={this.deleteProcess}>Delete</button>
          </div>
        </div>
      )
    } else {
      let submit = null;
      if(this.props.processModal.mode == modes.UPDATE){
        submit = (<button className="modalSubmit" type="submit" onClick={this.updateProcess}>Update</button>);
      } else {
        submit = (<button className="modalSubmit" type="submit" onClick={this.createProcess}>Submit</button>);
      }
      return (
        <div className="modal processModal">
          <h2>Process</h2>
          <label htmlFor="process"><strong>Process</strong></label><br/>
          <textarea name="process" className="processInput" value={this.state.process || ''} onChange={this.onChange}></textarea><br/>
          <label htmlFor="category"><strong>Category</strong></label><br/>
          <select name="category" onChange={this.onChange} value={this.state.category || ''} className="processCategory">
            <option value="lifestyle">Lifestyle</option>
            <option value="work">Work</option>
            <option value="self development">Self Development</option>
            <option value="fun">Fun</option>
          </select>
          <br/>
          <label htmlFor="tags"><strong>Tags</strong></label>
          <TagInput tags={this.state.tags} name="tags" onChange={this.changeTags} /><br/>
          <div className="buttonContainer">
            <button className="modalCancel" onClick={this.closeModalAnimation}>Cancel</button>
            {submit}
          </div>
        </div>
      );
    }
  }

  render (){
    let modalContent = this.modalContent();  

    return (
      <Modal>
        <CSSTransition 
          in={this.state.modalBackgroundAnimation} 
          classNames="modal-bg" 
          timeout={{ appear: 300, exit: 300 }}
          appear={true}
          unmountOnExit >
          <div className="modal-bg"></div>
        </CSSTransition>

        <CSSTransition
          in={this.state.modalAnimation}
          classNames="modal"
          timeout={{ appear: 300, exit: 300 }}
          appear={true}
          unmountOnExit
        >
          {modalContent}
        </CSSTransition>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    processForm: state.processForm,
    processModal: state.processModal,
    auth: state.auth
  }
}

const mapDispatchToProps = { 
  updateProcessForm, 
  requestProcessCreation, 
  requestProcessUpdate,
  requestProcessDelete,
  closeProcessModal
}


export default connect(mapStateToProps, mapDispatchToProps)(ProcessModal);