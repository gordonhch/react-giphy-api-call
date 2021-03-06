import React, { Component } from "react";

import "./App.css";
import "./tachyons.min.css";

import ImgLoading from "./ImgLoading/ImgLoading";
import ImgRender from "./ImgRender/ImgRender";
import PageCounter from "./PageCounter/PageCounter";
import QualitySwitch from "./QualitySwitch/QualitySwitch";
import handleSubmit from "./handleSubmit";
// function handleClick(e, data) {
//   console.log(data.foo);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 12,
      term: "rgb",
      previousTerm: "",
      loadingMode: "Quality",
      img: "",
      imgArray: [],
      offset: 0,
      total_count: 0,
      total_page: 0,
      loaded_count: 0,
      page: 1,
      
      initialized: false,
      loading: false,
    };
  }

  handleSetState = (props) => {
    this.setState(props);
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  loadingCheck = () => {
    //console.log(this.state.loading) //check how many re-renders happen : 4
    if(
      //if all loaded
      (this.state.limit===this.state.loaded_count
      //all images available (<12) loaded
      || (this.state.total_page === this.state.page && this.state.loaded_count===(this.state.total_count%this.state.limit))
      //if no results
      ||this.state.imgArray.length===0)
      &&this.state.loading===true
      ) {this.loading(false)}
  }

  loading = (loading) => {
    if(loading){
      this.setState({loading: true});
    } else {
      this.setState({loading: false});
    }
  }



  onClickSearch = async() => {
    if (this.state.previousTerm !== this.state.term) {
      this.setState({ offset: 0 , page:1, previousTerm: this.state.term, imgArray: []});
      await handleSubmit(this.state, this.handleSetState, this.loading);
      if (!this.state.initialized) { this.setState({ initialized: true }) };
    }
  };

  onClickMore = async () => {
    this.setState({ offset: this.state.offset + 0 }); 
    await handleSubmit();
  };
  onClickToPage = async(p) => {
    await this.setState({ offset: this.state.offset + this.state.limit * p , page:this.state.page + 1*p}); 
    handleSubmit(this.state,this.handleSetState,this.loading);
  };

  navBtn = (text, nav) => {
    return(
      <a href="#resultsAnchor" className="ph5 pv2 ba br0 mh1 b--dark-gray no-underline white hover-white bg-dark-gray hover-bg-mid-gray bg-animate" 
              onClick={() => this.onClickToPage(nav)}>
                {text}
              </a>
    )
  }

  formEnterRelay = (e) => {
    e.preventDefault();
    this.onClickSearch();
  }

  componentDidUpdate() {
    this.loadingCheck();
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
          <div className="pt6 pb3 ph3 white  bg-animate "><h1 className="pa2 dib hover-bg-pink bg-animate" id="header">Utterly useless GIF version searcher</h1></div>
        </div>
        <QualitySwitch loadingMode={this.state.loadingMode} handleSetState={this.handleSetState}/>

      <div className="pa3"><img autoPlay loop alt="title" src="https://media2.giphy.com/media/YWAiayVul0JLq/200w.webp?cid=e1bb72ff5c53fbdf6a35435132f2ab73"/></div>
        <div className="pv4">
          <form onSubmit={this.formEnterRelay}>
            <input id="searchBox" className="ph3 pv2 ba br0 bw0 b--white" value={this.state.term} onChange={this.onChange} />
            <button  id="resultsAnchor" type="button" className="ph3 pv2 ba br0 b--dark-gray white hover-white bg-dark-gray hover-bg-mid-gray bg-animate" onClick={() => this.onClickSearch()}>Search!</button>
          </form>
        </div>
        
        <div>
          <ul className="ph0">
            {
              this.state.loading&&this.state.limit!==this.state.loaded_count ? (<ImgLoading/>) : ("")
            }
            { 
              this.state.imgArray.length === 0 ? (
              this.state.initialized ? <p className="mid-gray pv6">no results</p> : <p className="mid-gray pv6"></p>
            ) : (
              <ImgRender
                imgArray={this.state.imgArray}
                offset={this.state.offset}
                term={this.state.term}
                loadingMode={this.state.loadingMode}
                loadComplete={()=>this.setState({loaded_count: this.state.loaded_count+1})}
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
            ? <PageCounter total_count={this.state.total_count} total_page={this.state.total_page} page={this.state.page} limit={this.state.limit} />
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
