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
      offset: 0
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = async() => {
    // if(event){event.preventDefault();}
    const api_key = "dc6zaTOxFJmzC";
    let offset = this.state.offset;
    let url = `http://api.giphy.com/v1/gifs/search?q=${
      this.state.term
    }&api_key=${api_key}&limit=10&offset=${offset}`;

    //axios w/promise
    // axios(url)
    //   .then(response => {
    //     console.log(response.data.data);
    //     this.setState({ imgArray: this.state.imgArray.concat(response.data.data) });
    //   })
    //   .catch(e => console.log("error", e));
    
    //axios w/ await
    try {
      let response = await axios(url);
      console.log(response.data.data);
      this.setState({
        imgArray: this.state.imgArray.concat(response.data.data)
      });
    } catch (e) {
      console.log("error", e);
    }
    

    } 

  onClickSearch = () => {
    this.handleSubmit();
  };

  onClickMore = async () => {
    this.setState({ offset: this.state.offset + 10 });
    await this.handleSubmit();
  };

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundColor: "#18181C",
          width: "100%",
          minHeight: "100vh"
        }}
      >
        <input value={this.state.term} onChange={this.onChange} />
        <button onClick={() => this.onClickSearch()}>Search!</button>
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
      </div>
    );
  }
}

const ImgRender = (props) => {
  let { imgArray, term, offset } = props;
  return imgArray.map((item, index) => (
    <a href={item.images.original.url} target="blank" key={index}>
      <img
        src={item.images.fixed_height.url}
        height="200"
        alt={term}
        style={{ color:'#18181C'}}
      />
    </a>
  ));
}

export default App;
