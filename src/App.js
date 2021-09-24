import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Search extends Component{
 constructor(props){
super(props)
this.state = {
  res: []

}
this.res = ''
this.title = ''
this.handleChange = (e) => {
  this.title = e.target.value
  //console.log(this.title);
}
this.handleSubmit = (e) => {
  let results = '';
  e.preventDefault();
  
  fetch(`https://help-search-api-prod.herokuapp.com/search?query=${this.title}`)
  .then(response => response.json())
  .then(jsonData => {
    this.setState({
      res: jsonData
    })
    console.log(jsonData)
  })

}

}
 render(){

  return (
  <div className="offset-md-3 col-md-6">
    <h2>Search form</h2>
    <form onSubmit={this.handleSubmit} >
    <div className="form-group">
      <input onChange={this.handleChange} className="form-control" ref="title" type="text" placeholder="Enter title"></input>
      </div>
      <div className="form-group">
      <button  type="submit" className="btn btn-primary">Submit</button>
    </div>
    </form>
    <div>
      <table className="table table-striped" >
        <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>

    {
      this.state.res.results &&
      this.state.res.results.map(res => <tr><td>{res.title}</td><td>{res.description}</td></tr>)
    }
    </tbody>
    </table>
 </div>
  </div>
)
 }
}

export default Search