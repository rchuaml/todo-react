class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    // this.deleteHandler = this.deleteHandler.bind( this );
  }

  state = {
    list : [],
    word : "",
    error: ""
  }

  changeHandler(event){
    //react waits for both setstates to happen before rendering(proven by console log)
    console.log("before setstate of event.target.value")
    this.setState({word:event.target.value});
    console.log("before setstate of error")
    this.setState({error:""});
}


  clickHandler(){
    if(this.state.word.length > 1 && this.state.word.length <20){
        var fakeArr = this.state.list;
        fakeArr.push(this.state.word);
        console.log("this.state.list", this.state.list);
        this.setState({ list: fakeArr});
    }
    else if(this.state.word.length<=1){
            this.setState({error: "Error, input must be more than 1 characters in length"});
    }
    else if (this.state.word.length>=20){
            this.setState({error: "Error, input must be less than 20 characters in length"});
    }
    }


  deleteHandler(index){
    var listArray = this.state.list;
    listArray.splice(index,1);
    this.setState({list:listArray});
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div>
            <div className = "error">{this.state.error}</div>
            <input onChange={this.changeHandler} value={this.state.word}/>
            <button onClick = {this.clickHandler}>add item</button>
            <ul>{this.state.list.map((listitem , index)=>{
                return <li>{listitem}<button onClick = {() => {this.deleteHandler(index)}}> Delete this item</button></li>;
                })}
            </ul>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);