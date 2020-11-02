import React from 'react';

class TagInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      tags: this.props.tags,
      tagInput: ""
    };
    this.addTag = this.addTag.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTag(event){
    if(event.target.value != ""){
      let tag = String(event.target.value).trim().replace(" ", "");
      if(this.state.tags.indexOf(tag) == -1){
        this.setState({
          tags: [...this.state.tags, tag],
          tagInput: ""
        }, () => {
          this.props.onChange(this.state.tags);
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
      }, () => {
        this.props.onChange(this.state.tags);
      });
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render(){
    let tags = null;
    if(this.state.tags.length){
      tags = this.state.tags.map((tag, index) => {
        return <li className="processTag" key={"tag_" + index}>{tag}</li>
      })
    }
    return (
      <div className="tagContainer">
        <ul className="tagList">
          {tags}
        </ul>
        <input className="tagInput" name="tagInput" value={this.state.tagInput} onKeyUp={this.keyUpHandler} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default TagInput;