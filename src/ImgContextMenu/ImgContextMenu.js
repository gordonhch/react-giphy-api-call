import React from "react";
//, { Component }
import { ContextMenu, MenuItem, SubMenu } from "react-contextmenu";
//{ ContextMenu, MenuItem, ContextMenuTrigger, SubMenu }
import "./contextMenuStyle.css";

const ImgContextMenu = (handleClick) => (
      <ContextMenu id="some_unique_identifier">
      <MenuItem onClick={handleClick} data={{ action: "giphy.com" }}>
      Giphy.com
          </MenuItem>
    <MenuItem onClick={handleClick} data={{ action: "embed" }}>
      Embed link
          </MenuItem>
    <MenuItem divider />
    <SubMenu title="Image versions">
      <MenuItem onClick={handleClick} data={{ action: "480w_still" }}>
        480w_still
            </MenuItem>
      <SubMenu title="downsized">
        <MenuItem onClick={handleClick} data={{ action: "downsized" }}>
          downsized
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "downsized_large" }}>
          downsized_large
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "downsized_medium" }}>
          downsized_medium
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "downsized_small", ext: "mp4" }}>
          downsized_small
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "downsized_still" }}>
          downsized_still
              </MenuItem>
      </SubMenu>
      <SubMenu title="fixed_height">
        <SubMenu title="fixed_height">
          <MenuItem onClick={handleClick} data={{ action: "fixed_height", ext: "url" }}>
            .gif version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_height", ext: "mp4" }}>
            .mp4 version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_height", ext: "webp" }}>
            .webp version
                </MenuItem>
        </SubMenu>
        <SubMenu title="fixed_height_downsampled">
          <MenuItem onClick={handleClick} data={{ action: "fixed_height_downsampled", ext: "url" }}>
            .gif version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_height_downsampled", ext: "webp" }}>
            .webp version
                </MenuItem>
        </SubMenu>
        <SubMenu title="fixed_height_small">
          <MenuItem onClick={handleClick} data={{ action: "fixed_height_small", ext: "mp4" }}>
            .mp4 version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_height_small", ext: "webp" }}>
            .webp version
                </MenuItem>
        </SubMenu>

        <MenuItem onClick={handleClick} data={{ action: "fixed_height_small_still" }}>
          fixed_height_small_still
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "fixed_height_still" }}>
          fixed_height_still
              </MenuItem>
      </SubMenu>
      <SubMenu title="fixed_width">
        <SubMenu title="fixed_width">
          <MenuItem onClick={handleClick} data={{ action: "fixed_width", ext: "url" }}>
            .gif version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_width", ext: "mp4" }}>
            .mp4 version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_width", ext: "webp" }}>
            .webp version
                </MenuItem>
        </SubMenu>
        <SubMenu title="fixed_width_downsampled">
          <MenuItem onClick={handleClick} data={{ action: "fixed_width_downsampled", ext: "url" }}>
            .gif version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_width_downsampled", ext: "webp" }}>
            .webp version
                </MenuItem>
        </SubMenu>
        <SubMenu title="fixed_width_small">
          <MenuItem onClick={handleClick} data={{ action: "fixed_width_small", ext: "url" }}>
            .gif version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_width_small", ext: "mp4" }}>
            .mp4 version
                </MenuItem>
          <MenuItem onClick={handleClick} data={{ action: "fixed_width_small", ext: "webp" }}>
            .webp version
                </MenuItem>
        </SubMenu>
        <MenuItem onClick={handleClick} data={{ action: "fixed_width_small_still" }}>
          fixed_width_small_still
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "fixed_width_still" }}>
          fixed_width_still
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "looping", ext: "mp4" }}>
          looping
              </MenuItem>
      </SubMenu>
      <SubMenu title="original">
        <MenuItem onClick={handleClick} data={{ action: "original", ext: "url" }}>
          original (gif)
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "original", ext: "mp4" }}>
          original (mp4)
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "original", ext: "webp" }}>
          original (webp)
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "original_mp4", ext: "mp4" }}>
          original (mp4)
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "original_still" }}>
          original_still
              </MenuItem>
      </SubMenu>
      <SubMenu title="preview">
        <MenuItem onClick={handleClick} data={{ action: "preview", ext: "mp4" }}>
          preview (mp4)
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "preview_gif" }}>
          preview_gif
              </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: "preview_webp" }}>
          preview_webp
              </MenuItem>
      </SubMenu>
      <MenuItem divider />

    </SubMenu>
    <MenuItem divider />
    <MenuItem onClick={handleClick} data={{ action: "about" }}>
      Properties(WIP)
          </MenuItem></ContextMenu>
  )

export default ImgContextMenu;