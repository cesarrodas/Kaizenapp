import React from 'react';

class TagInput extends React.Component {
  constructor(){
    super();

    this.state = {
      tags: [],
      tagInput: ""
    };
    this.addTag = this.addTag.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTag(event){
    if(event.target.value != ""){
      let tag = String(event.target.value).trim();
      if(this.state.tags.indexOf(tag) == -1){
        this.setState({
          tags: [...this.state.tags, tag],
          tagInput: ""
        });
      } else {
        this.setState({
          tagInput: ""
        });
      }
    }
  }

  keyUpHandler (event) {
    if(event.key === " "){
      this.addTag(event)
    } else if (event.key === "Backspace" && this.state.tagInput === ""){
      this.setState({
        tags: this.state.tags.slice(0, -1)
      });
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render(){
    const tags = this.state.tags.map((tag, index) => {
      return <li className="tag" key={"tag_" + index}>{tag}</li>
    });
    return (
      <div className="tagContainer">
        <ul className="tagList">
          {tags}
          <input className="tagInput" name="tagInput" value={this.state.tagInput} onKeyUp={this.keyUpHandler} onChange={this.handleChange}/>
        </ul>
      </div>
    )
  }
}

export default TagInput;