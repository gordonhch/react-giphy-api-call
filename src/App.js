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
      offset: 0,
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  handleSubmit = () => {
    
    // if(event){event.preventDefault();}
    const api_key = "dc6zaTOxFJmzC";
    let offset = this.state.offset;
    let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}&limit=10&offset=${offset}`;
    let imgArray = [];
    axios(url)
      .then(response => {
        //console.log(data);
        console.log(response.data.data);
        response.data.data.map((item, index) => {
          //console.log(offset + index);
          // imgArray.push({img: { [Number(index + offset)]: item.images.fixed_height.url } });
          //imgArray.push(item.images.fixed_height.url);
          imgArray.push(item);
          
        }
        );
        this.setState({ imgArray: this.state.imgArray.concat(imgArray) })
        
      })
      .catch(e => console.log('error', e));

  }

  onClickMore = async () => {
     this.setState({ offset: this.state.offset + 10 }, );
    await this.handleSubmit();
    }

  render() {
    return <div className="App">
        
          <input value={this.state.term} onChange={this.onChange} />
          <button onClick={this.handleSubmit}>Search!</button>
        
        <div>
          <ul>
            {this.state.imgArray.length == 0 ? (
              "empty"
            ) : (
              <ImgRender
                imgArray={this.state.imgArray}
                offset={this.state.offset}
                term={this.state.term}
              />
            )}
          </ul>
        </div>
        <div>
          {this.state.imgArray.length == 0 ? (
            ""
          ) : (
            <button onClick={() => this.onClickMore()}>More</button>
          )}
        </div>
      </div>;
  }
}

const ImgRender = (props) => {
  let { imgArray, term, offset } = props;
  //let iR = [];
  //console.log(imgArray);
  // imgArray.map((key, index) => {
  //   iR[index] = <img src={imgArray[index].img[index]} height="200" alt={term} key={index} />;
  // });
  // return iR;
  return imgArray.map((item, index) => 
    <a href={item.images.original.url} target="blank" key={index}>
      <img src={item.images.fixed_height.url} height="200" alt={term}  />
    </a>);
}

export default App;
