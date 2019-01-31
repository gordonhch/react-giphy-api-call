import React, { Component } from "react";

const PageCounter = (props) => {
    console.log(props.page);
    let {page, total_count} = props;
    return(
      <p className="white">Page {page} of {Math.ceil((total_count||0)/10)} in {total_count} images</p>
    )
  }

export default PageCounter;