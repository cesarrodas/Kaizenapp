import React from 'react';
import { connect } from 'react-redux';
import { updateProcessForm, requestProcessCreation, requestProcessUpdate, closeProcessModal } from '../state/actions/actions';
import Modal from './Modal';
import { modes } from '../state/reducers/processModal';
import { CSSTransition } from 'react-transition-group';
import TagInput from './TagInput';

class ProcessModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalBackgroundAnimation: true,
      modalAnimation: true,
    }
    this.closeModalAnimation = this.closeModalAnimation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeTags = this.changeTags.bind(this);
    this.modalContent = this.modalContent.bind(this);
    this.createProcess = this.createProcess.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
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

    this.props.updateProcessForm({
      [event.target.name]: event.target.value
    });
  }

  changeTags(tags){
    this.props.updateProcessForm({
      process: this.state.processName,
      category: this.state.processCategory,
      tags: tags,
      creator: this.props.auth.userData._id
    });
  }

  createProcess(){
    this.props.requestProcessCreation(this.props.processForm);
  }

  updateProcess(){
    this.props.requestProcessUpdate(this.props.processForm);
  }

  modalContent(){
    console.log("modal Content", this.props.processModal);
    if(this.props.processModal.mode == modes.DELETE){
      return (
        <div className="modal processModal">
          <h2>Delete</h2>
          <p>Are you sure? </p>
          <button onClick={this.closeModalAnimation}>Cancel</button>
          <button onClick={this.props.deleteProcess}>Delete</button>
        </div>
      )
    } else {
      let submit = null;
      if(this.props.processModal.mode == modes.UPDATE){
        submit = (<button type="submit" onClick={this.updateProcess}>Update</button>);
      } else {
        submit = (<button type="submit" onClick={this.createProcess}>Submit</button>);
      }
      return (
        <div className="modal processModal">
          <h2>Process</h2>
          <label htmlFor="processName"><strong>Process</strong></label><br/>
          <input name="processName" value={this.props.processForm.process} onChange={this.onChange}></input>
          <label htmlFor="processCategory"><strong>Category</strong></label><br/>
          <select name="processCategory" onChange={this.onChange} value={this.props.processForm.category} className="processCategory">
            <option value="lifestyle">Lifestyle</option>
            <option value="work">Work</option>
            <option value="self development">Self Development</option>
            <option value="fun">Fun</option>
          </select>
          <br/>
          <label htmlFor="tags"><strong>Tags</strong></label>
          <TagInput tags={this.props.processForm.tags} name="tags" onChange={this.changeTags} /><br/>
          <button onClick={this.closeModalAnimation}>Cancel</button>
          {submit}
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
  closeProcessModal
}


export default connect(mapStateToProps, mapDispatchToProps)(ProcessModal);