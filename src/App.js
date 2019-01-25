import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import onChange from "./onChange";
import "./tachyons.min.css";
import "./contextMenuStyle.css";
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu";

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
      <a href="#searchBox" className="ph5 pv2 ba br0 b--dark-gray no-underline white hover-white bg-dark-gray hover-bg-mid-gray bg-animate" 
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
      <div className="pa3"><video autoPlay loop src="https://media3.giphy.com/media/YWAiayVul0JLq/100.mp4?cid=e1bb72ff5c4ad5bf4d564e413694c2ea"/></div>
        <div className="pv4">
          <form onSubmit={this.formEnterRelay}>
            <input id="searchBox" className="ph3 pv2 ba bw0 b--white" value={this.state.term} onChange={this.onChange} />
            
            <button type="button" className="ph3 pv2 ba br0 b--dark-gray white hover-white bg-dark-gray hover-bg-mid-gray bg-animate" onClick={() => this.onClickSearch()}>Search!</button>
          </form>
        </div>
        
        <div>
          <ul>
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

const PageCounter = (props) => {
  console.log(props.page);
  let {page, total_count} = props;
  return(
    <p className="white">Page {page} of {Math.ceil((total_count||0)/10)} in {total_count} images</p>
  )
}

class ImgRender extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = (e, data, target) => {
    let { action, bitly_url, embed_url, images, ext = ''} = data;

    let actType1 = ["480w_still", "downsized", "downsized_large", "downsized_medium", 
               "downsized_still", "fixed_height_small_still", 
              "fixed_height_still", "fixed_width_small_still", "fixed_width_still", 
              "looping", "original_still", 
              "preview_gif", "preview_webp"];

    let actType2 = ["downsized_small", "fixed_height", "fixed_height_downsampled", 
                "fixed_height_small", "fixed_width", "fixed_width_downsampled", 
                "fixed_width_small", "looping", "original",
                "original_mp4", "preview",];
    let supportedExt = ["url", "mp4", "webp",];
    if (action==='giphy.com'){
      console.log(bitly_url);
      window.open(bitly_url);
    }
    else if (action==='embed'){
      console.log(embed_url);
      window.open(embed_url);
    }
    else if (actType1.indexOf(action) !== -1) {
      console.log(images[action].url);
      window.open(images[action].url);
    }
    else if (actType2.indexOf(action) !== -1) {
      if(supportedExt.indexOf(ext) !== -1) {
        console.log(images[action][ext]);
        window.open(images[action][ext]);
      }
      // if (ext == "url") {
      //   console.log(images[action].url);
      //   window.open(images[action].url);
      // }
      // else if (ext == "mp4"){
      //   console.log(images[action].mp4);
      //   window.open(images[action].mp4);
      // }
      // else if (ext == "webp") {
      //   console.log(images[action].webp);
      //   window.open(images[action].webp);
      // }
      else {
        console.log(`unsupported ext: ${ext}`);
        console.error('ext unseen error');
      }
    }
    //console.log(target);
    
  }

  render() {
    let { imgArray, term, offset } = this.props;
    // console.log(typeof handleClick);
    return <div>
        {imgArray.map((item, index) => (
          <a
            href={item.images.original.url}
            target="blank"
            key={index}
            className="dib "
          >
            <ContextMenuTrigger
              id="some_unique_identifier"
              name={item.name}
              holdToDisplay={1000}
              collect={() => ({
                bitly_url: item.bitly_url,
                embed_url: item.embed_url,
                images: item.images
              })}
            >
              <img
                src={item.images.fixed_height.url}
                height="200"
                alt={term}
                style={{ color: "#18181C" }}
              />
            </ContextMenuTrigger>
          </a>
        ))}
      <ContextMenu id="some_unique_identifier">
        <MenuItem onClick={this.handleClick} data={{ action: "giphy.com" }}>
          Giphy.com
        </MenuItem>
        <MenuItem onClick={this.handleClick} data={{ action: "embed" }}>
          Embed link
        </MenuItem>
        <MenuItem divider />
        <SubMenu title="Image versions">
          <MenuItem onClick={this.handleClick} data={{ action: "480w_still" }}>
            480w_still
          </MenuItem>
          <SubMenu title="downsized">
            <MenuItem onClick={this.handleClick} data={{ action: "downsized" }}>
              downsized
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_large" }}>
              downsized_large
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_medium" }}>
              downsized_medium
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_small", ext: "mp4" }}>
              downsized_small
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_still" }}>
              downsized_still
            </MenuItem>
          </SubMenu>
          <SubMenu title="fixed_height">
            <SubMenu title="fixed_height">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height", ext: "url" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height", ext: "webp" }}>
                .webp version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_height_downsampled">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_downsampled", ext: "url" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_downsampled", ext: "webp" }}>
                .webp version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_height_small">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_small", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_small", ext: "webp" }}>
                .webp version
              </MenuItem>
            </SubMenu>

            <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_small_still" }}>
              fixed_height_small_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_still" }}>
              fixed_height_still
            </MenuItem>
          </SubMenu>
          <SubMenu title="fixed_width">
            <SubMenu title="fixed_width">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width", ext: "url" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width", ext: "webp" }}>
                .webp version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_width_downsampled">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_downsampled", ext: "url" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_downsampled", ext: "webp" }}>
                .webp version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_width_small">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small", ext: "url" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small", ext: "webp" }}>
                .webp version
              </MenuItem>
            </SubMenu>
            <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small_still" }}>
              fixed_width_small_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_still" }}>
              fixed_width_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "looping", ext: "mp4" }}>
              looping
            </MenuItem>
          </SubMenu>
          <SubMenu title="original">
            <MenuItem onClick={this.handleClick} data={{ action: "original", ext: "url" }}>
              original (gif)
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "original", ext: "mp4" }}>
              original (mp4)
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "original", ext: "webp" }}>
              original (webp)
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "original_mp4", ext: "mp4" }}>
              original (mp4)
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "original_still" }}>
              original_still
            </MenuItem>
          </SubMenu>
          <SubMenu title="preview">
            <MenuItem onClick={this.handleClick} data={{ action: "preview", ext: "mp4" }}>
              preview (mp4)
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "preview_gif" }}>
              preview_gif
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "preview_webp" }}>
              preview_webp
            </MenuItem>
          </SubMenu>
          <MenuItem divider />
          
        </SubMenu>
        <MenuItem divider />
        <MenuItem onClick={this.handleClick} data={{ action: "about" }}>
        Properties(WIP)
        </MenuItem>
      </ContextMenu>
      </div>;
  }
  
}



export default App;
