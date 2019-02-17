class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.editHandler = this.editHandler.bind( this );
    this.deleteHandler = this.deleteHandler.bind( this );
    this.doneHandler = this.doneHandler.bind( this );
  }

  state = {
    list : [],
    dates: [],
    word : "",
    error: "",
    doneList: []
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
        var date = this.state.dates;
        date.push(moment().format('MMMM Do YYYY, h:mm:ss a'));
        console.log("this.state.list", this.state.list);
        //after 10 seconds the task expires still buggy
        // setTimeout(()=>{this.doneHandler(this.state.list.length-1)}
        // , 10000);
        this.setState({ list: fakeArr});
        this.setState({ dates: date});

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
    var dateArray = this.state.dates;
    dateArray.splice(index,1);
    this.setState({ list:listArray });
    this.setState({ dates: dateArray});
  }

  editHandler(index){
    var editArray = this.state.list;
    editArray.splice(index, 1, this.state.word);
    var dateArray = this.state.dates;
    dateArray.splice(index, 1, moment().format('MMMM Do YYYY, h:mm:ss a'));
    this.setState({ list:editArray});
    this.setState({ dates: dateArray});
  }

  doneHandler(index){
    var dList = this.state.doneList;
    var list = this.state.list;
    dList.push(list[index] + " done at " + moment().format('MMMM Do YYYY, h:mm:ss a'));

    list.splice(index,1);
    //remove date from date array
    var dateArray = this.state.dates;
    dateArray.splice(index, 1, moment().format('MMMM Do YYYY, h:mm:ss a'));

    this.setState({doneList: dList});
    this.setState({list: list});
    this.setState({date: dateArray});
  }

  render() {
      // render the list with a map() here
      console.log("rendering");
      return (
        <div>
            <div className = "error">{this.state.error}</div>
            <input onChange={this.changeHandler} value={this.state.word}/>
            <button className = "add" onClick = {this.clickHandler}>add item</button>
            <div className = "List">
                <h1>Unfinished tasks</h1>
                <table className="table">
                    <thead><tr><th scope = "col">Date</th><th scope = "col">Task</th></tr></thead>
                    <tbody>
                    {this.state.list.map((listitem , index)=>{
                    return <tr> <td>{this.state.dates[index]}</td><td>{listitem}<button onClick = {() => {this.doneHandler(index)}}> Mark as done</button><button onClick = {() => {this.editHandler(index)}}> Edit this item</button><button onClick = {() => {this.deleteHandler(index)}}> Delete this item</button></td></tr>;
                    })}
                    </tbody>
                </table>
            </div>
            <div className = "Done">
                <h1>Finished tasks</h1>
                <ul>{this.state.doneList.map((listitem , index)=>{
                        return <li>{listitem}</li>;
                        })}
                </ul>
            </div>


        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);