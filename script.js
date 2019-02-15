class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
  }

  state = {
    list : [],
    word : ""
  }

  changeHandler(event){
    this.setState({word:event.target.value});
    console.log("change", event.target.value);
  }

  clickHandler(){
    this.state.list.push(this.state.word);
    this.setState({ word : "" });
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word}/>
          <button onClick = {this.clickHandler}>add item</button>
          <ul>{this.state.list.map(x=>{
            return <li>{x}</li>;
          })}</ul>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);