import React from 'react';
import Modal from './Modal';
import { CSSTransition } from 'react-transition-group';
import TagInput from './TagInput';

class ProcessModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalBackgroundAnimation: true,
      modalAnimation: true
    }
    this.closeModal = this.closeModal.bind(this);
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

  render (){
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
          <input name="processName"></input>
          <label htmlFor="processCategory"><strong>Category</strong></label><br/>
          <select name="processCategory" className="processCategory">
            <option value="lifestyle">Lifestyle</option>
            <option value="work">Work</option>
            <option value="self development">Self Development</option>
            <option value="fun">Fun</option>
          </select>
          <br/>
          <label htmlFor="tags"><strong>Tags</strong></label>
          <TagInput /><br/>
          <button onClick={this.closeModal}>Close</button>
          <button>Submit</button>
        </div>
      </Modal>
    );
  }
}

export default ProcessModal;