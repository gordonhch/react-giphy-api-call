import React from "react";
//, { Component }

const PageCounter = (props) => {
    //console.log(props.page);
    let {page, total_page, total_count, limit} = props;
    return(
      <p className="white">Page {page} of {total_page} in {total_count} images</p>
    )
  }

export default PageCounter;