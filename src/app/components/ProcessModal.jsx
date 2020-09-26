import React from 'react';
import { connect } from 'react-redux';
import { updateProcessForm, requestProcessCreation } from '../state/actions/actions';
import Modal from './Modal';
import { CSSTransition } from 'react-transition-group';
import TagInput from './TagInput';

class ProcessModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalBackgroundAnimation: true,
      modalAnimation: true,
      processName: this.props.processForm.process,
      processCategory: this.props.processForm.category,
      tags: this.props.processForm.tags
    }
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeTags = this.changeTags.bind(this);
    this.submitProcess = this.submitProcess.bind(this);
  }

  closeModal(){
    this.setState({
      modalBackgroundAnimation: false,
      modalAnimation: false
    });
    setTimeout(() => {
      this.props.closeModal()
    }, 300);
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.updateProcessForm({
        process: this.state.processName,
        category: this.state.processCategory,
        tags: this.state.tags,
        creator: this.props.auth.userData._id
      });
    });
  }

  changeTags(tags){
    this.setState({
      tags: tags
    }, () => {
      this.props.updateProcessForm({
        process: this.state.processName,
        category: this.state.processCategory,
        tags: this.state.tags,
        creator: this.props.auth.userData._id
      });
    });
  }

  submitProcess(){
    //console.log("process submission: ", this.state);
    this.props.requestProcessCreation(this.props.processForm);
  }

  render (){
    let submit = null;
    if(this.props.edit){
      submit = (<button type="submit" onClick={this.submitProcess}>Update</button>);
    } else {
      submit = (<button type="submit" onClick={this.submitProcess}>Submit</button>);
    }

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

        <div className="modal processModal">
          <h2>Process</h2>
          <label htmlFor="processName"><strong>Process</strong></label><br/>
          <input name="processName" value={this.state.processName} onChange={this.onChange}></input>
          <label htmlFor="processCategory"><strong>Category</strong></label><br/>
          <select name="processCategory" onChange={this.onChange} value={this.state.processCategory} className="processCategory">
            <option value="lifestyle">Lifestyle</option>
            <option value="work">Work</option>
            <option value="self development">Self Development</option>
            <option value="fun">Fun</option>
          </select>
          <br/>
          <label htmlFor="tags"><strong>Tags</strong></label>
          <TagInput tags={this.state.tags} onChange={this.changeTags} /><br/>
          <button onClick={this.closeModal}>Close</button>
          {submit}
        </div>
      </Modal>
    );
  }
}

//export default ProcessModal;

const mapStateToProps = (state) => {
  return {
    processForm: state.processForm,
    auth: state.auth
  }
}

const mapDispatchToProps = { updateProcessForm, requestProcessCreation }

export default connect(mapStateToProps, mapDispatchToProps)(ProcessModal);