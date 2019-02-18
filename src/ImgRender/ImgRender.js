import React, { Component } from "react";
import { ContextMenuTrigger } from "react-contextmenu";
// { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } 
import ImgContextMenu from "../ImgContextMenu/ImgContextMenu";
import './ImgRender.css';

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
      let { imgArray, term, loadComplete } = this.props; //{ imgArray, term, offset,loadComplete }
      // console.log(typeof handleClick);
      return <div className="ImgRender">
          {imgArray.map((item, index) => (
            <a
              href={item.images.original.url}
              target="blank"
              key={index}
              className=" dib"
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
                  onLoad={loadComplete}
                />
              </ContextMenuTrigger>
            </a>
          ))}
          {ImgContextMenu(this.handleClick)};
        </div>;
    }
    
  }

  export default ImgRender;