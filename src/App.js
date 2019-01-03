import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import onChange from "./onChange";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "rgb",
      img: "",
      imgArray: [],
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  } 

  handleSubmit = (event) => {
    event.preventDefault();
    const api_key = "dc6zaTOxFJmzC";
    const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}&limit=10`;
    let imgArray = [];
    axios(url)
      .then(response => {
        //console.log(data);
        response.data.data.map((key, index) => {
          imgArray[index] =  {
            
            img: {
              [index]: response.data.data[index].images.fixed_height.url
            }
          }

          this.setState({ imgArray, term: "",})
        }
        );
      })
      .catch(e => console.log('error', e));

  }
  
  render() {
    return (
    <div className="App" >
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.term} onChange={this.onChange} />
        <button>Search!</button>
      </form>
        <div>
          <ul>
            {this.state.imgArray.isEmpty ? "empty!" : <ImgRender imgArray={this.state.imgArray} term={this.state.term} />}
              
          </ul>
        </div>
        <div>
          {this.state.imgArray.isEmpty ? "" : ""}
        </div>
    </div>
    );
  }
}

const ImgRender = (props) => {
  let {imgArray, term} = props;
  let iR = [];
  //console.log(imgArray);
  imgArray.map((key, index) => {
    iR[index] = <img src={imgArray[index].img[index]} height="200" alt={term} />;
  });
  return iR;
}

export default App;
