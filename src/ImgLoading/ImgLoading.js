import React from "react";
import LottieControl from './lottieAnimation';
//, { Component }

const ImgLoading = () => (
    <div 
    className="w-100 pa5"
    style={{
        height:"100%",
        position: "fixed",         
        top: "0",
        left: "0",  
        backgroundColor: "rgba(0,0,0,0.50)",
}}
    >
     <h1 className="gray">LOADING</h1><LottieControl/>
    </div>
)
export default ImgLoading;