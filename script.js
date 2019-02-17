class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
  }

  state = {
    list : [],
    word : "",
    error: ""
  }

  changeHandler(event){
    this.setState({word:event.target.value});
    this.setState({error:""});
    console.log("change", event.target.value);
  }

  clickHandler(){

    if(this.state.word.length > 1 && this.state.word.length <20){
    this.state.list.push(this.state.word);
    this.setState({ word : "" });
    }else{
        if(this.state.word.length<=1){
            this.setState({error: "Error, input must be more than 1 characters in length"});
        }else if (this.state.word.length>=20){
            this.setState({error: "Error, input must be less than 20 characters in length"});
        }
    }
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div>
        <div className = "error">{this.state.error}</div>
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word}/>
          <button onClick = {this.clickHandler}>add item</button>
          <ul>{this.state.list.map(x=>{
            return <li>{x}</li>;
          })}</ul>
        </div>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);