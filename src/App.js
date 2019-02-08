import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import "./tachyons.min.css";
import "./contextMenuStyle.css";

import ImgRender from "./ImgRender";
import PageCounter from "./PageCounter";

// function handleClick(e, data) {
//   console.log(data.foo);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "rgb",
      previousTerm: "",
      img: "",
      imgArray: [],
      offset: 0,
      total_count: 0,
      page: 1,
      initialized: false,
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = async() => {
    // if(event){event.preventDefault();}
    const api_key = "dc6zaTOxFJmzC";
    let offset = this.state.offset;
    let url = `https://api.giphy.com/v1/gifs/search?q=${
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
      //console.log(response.data.data);
      console.log(response.data.pagination);
      this.setState({
        //imgArray: this.state.imgArray.concat(response.data.data)
        imgArray: response.data.data,
        total_count: response.data.pagination.total_count,
      });
    } catch (e) {
      console.log("error", e);
    }
  } 

  onClickSearch = async() => {
    if (this.state.previousTerm !== this.state.term) {
      this.setState({ offset: 0 , previousTerm: this.state.term, imgArray: []});
      await this.handleSubmit();
      if (!this.state.initialized) { this.setState({ initialized: true }) };
    }
  };

  onClickMore = async () => {
    this.setState({ offset: this.state.offset + 0 }); 
    await this.handleSubmit();
  };
  onClickToPage = async(p) => {
    await this.setState({ offset: this.state.offset + 10*p , page:this.state.page + 1*p}); 
    this.handleSubmit();
  };

  navBtn = (text, nav) => {
    return(
      <a href="#searchBox" className="ph5 pv2 ba br0 mh1 b--dark-gray no-underline white hover-white bg-dark-gray hover-bg-mid-gray bg-animate" 
              onClick={() => this.onClickToPage(nav)}>
                {text}
              </a>
    )
  }

  formEnterRelay = (e) => {
    e.preventDefault();
    this.onClickSearch();
  }

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundColor: "#18181C",
          width: "100%",
          minHeight: "100vh"
        }}
      > <div className="">
        <div className="pa3 white  bg-animate "><h1 className="pa2 dib hover-bg-pink bg-animate">Utterly useless GIF version searcher</h1></div>
      </div>
      <div className="pa3"><img autoPlay loop src="https://media2.giphy.com/media/YWAiayVul0JLq/200w.gif?cid=e1bb72ff5c53fbdf6a35435132f2ab73"/></div>
        <div className="pv4">
          <form onSubmit={this.formEnterRelay}>
            <input id="searchBox" className="ph3 pv2 ba br0 bw0 b--white" value={this.state.term} onChange={this.onChange} />
            
            <button type="button" className="ph3 pv2 ba br0 b--dark-gray white hover-white bg-dark-gray hover-bg-mid-gray bg-animate" onClick={() => this.onClickSearch()}>Search!</button>
          </form>
        </div>
        
        <div>
          <ul className="ph0">
            {this.state.imgArray.length === 0 ? (
              this.state.initialized ? <p className="mid-gray pv6">no results</p> : <p className="mid-gray pv6"></p>
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
          {(this.state.imgArray.length === 0)
            ? "" : this.state.page === 1 ? "" : this.navBtn('Back', -1)
          }
          {
            this.state.imgArray.length === 0
            ? "" : this.navBtn('Next', 1)
          }
        </div>
        <div>
          {this.state.initialized
            ? <PageCounter total_count={this.state.total_count} page={this.state.page} />
            : ""
          }
        </div>
        <div className="pt3 pb6 mid-gray">
        <p>right click on image for more options</p>
        <p className="white">Powered by GIPHY.com</p>
        <p>for testing purpose only</p>
        </div>
        
      </div>
    );
  }
}

export default App;
