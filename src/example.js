import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import onChange from "./onChange";
import "./tachyons.min.css";
import "./contextMenuStyle.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

// function handleClick(e, data) {
//   console.log(data.foo);
// }

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


  onChange = event => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = async () => {
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
    this.setState({ offset: this.state.offset + 10 });
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
class ImgRender extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = (e, data) => {
    console.log(data);
  }

  render() {
    let { imgArray, term, offset } = this.props;
    // console.log(typeof handleClick);
    return <div>
      <h3>Custom Wrappers</h3>
      <p>
        This demo shows usage of customization. Instead of using <code>
          div
          </code>(s) by default, we are using <code>tr</code>(s)
        </p>
      <table className="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Fruit</th>
          </tr>
        </thead>
        <tbody>
          {imgArray.map((item, i) => (
            <ContextMenuTrigger
              renderTag="tr"
              name={item.name}
              id="m"
              holdToDisplay={1000}
              key={i}
            //collect={collect}
            >
              <td>{i + 1}</td>
              <td>{item.name}</td>
            </ContextMenuTrigger>
          ))}
        </tbody>
      </table>

      <ContextMenu id="m">
        <MenuItem onClick={this.handleClick} data={{ item: "item 1" }}>
          Menu Item 1
          </MenuItem>
        <MenuItem onClick={this.handleClick} data={{ item: "item 2" }}>
          Menu Item 2
          </MenuItem>
      </ContextMenu>
    </div>;
  }

}

export default App;
