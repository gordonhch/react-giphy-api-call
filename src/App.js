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
      img: "",
      imgArray: [],
      offset: 0,
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

  handleClick = (e, data, target) => {
    let { action, bitly_url, embed_url, images} = data;
    if (action=='giphy.com'){
      console.log(bitly_url);
      window.open(bitly_url);
    }
    else if (action=='embed'){
      console.log(embed_url);
      window.open(embed_url);
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
          <MenuItem divider/>
          <SubMenu title="Image versions">
            <MenuItem onClick={this.handleClick} data={{ action: "480w_still" }}>
              480w_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized" }}>
              downsized
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_large" }}>
              downsized_large
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_medium" }}>
              downsized_medium
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_small" }}>
              downsized_small
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "downsized_still" }}>
              downsized_still
            </MenuItem>
            <SubMenu title="fixed_height">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height", ext: "webm" }}>
                .webm version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_height_downsampled">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_downsampled", ext: "gif" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_downsampled", ext: "webm" }}>
                .webm version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_height_small">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_small", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_small", ext: "webm" }}>
                .webm version
              </MenuItem>
            </SubMenu>

            <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_small_still" }}>
              fixed_height_small_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "fixed_height_still" }}>
              fixed_height_still
            </MenuItem>

            <SubMenu title="fixed_width">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width", ext: "webm" }}>
                .webm version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_width_downsampled">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_downsampled", ext: "gif" }}>
                .gif version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_downsampled", ext: "webm" }}>
                .webm version
              </MenuItem>
            </SubMenu>
            <SubMenu title="fixed_width_small">
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small", ext: "mp4" }}>
                .mp4 version
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small", ext: "webm" }}>
                .webm version
              </MenuItem>
            </SubMenu>
            <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_small_still" }}>
              fixed_width_small_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "fixed_width_still" }}>
              fixed_width_still
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "looping" }}>
              looping
            </MenuItem>
            <SubMenu title="original">
              <MenuItem onClick={this.handleClick} data={{ action: "original", ext: "mp4" }}>
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
              <MenuItem onClick={this.handleClick} data={{ action: "preview_gif", ext: "gif" }}>
                preview_gif
              </MenuItem>
              <MenuItem onClick={this.handleClick} data={{ action: "preview_webp", ext: "webp" }}>
                preview_webp
              </MenuItem>
            </SubMenu>
            <MenuItem divider />
            <MenuItem onClick={this.handleClick} data={{ action: "item 2" }}>
              Menu Item 2
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ action: "item 2" }}>
              Menu Item 2
            </MenuItem>
          </SubMenu>
          <MenuItem onClick={this.handleClick} data={{ action: "item 2" }}>
            Menu Item 2
          </MenuItem>
        </ContextMenu>
      </div>;
  }
  
}

export default App;
