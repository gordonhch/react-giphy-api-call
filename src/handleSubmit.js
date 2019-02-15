import axios from "axios";
const handleSubmit = async(props, setState, loading) => {
    console.log(props);
    let {state} = props;
    // if(event){event.preventDefault();}
    const api_key = "dc6zaTOxFJmzC";
    let offset = state.offset;
    let url = `https://api.giphy.com/v1/gifs/search?q=${
      state.term
    }&api_key=${api_key}&limit=${state.limit}&offset=${offset}`;

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
      setState({
        //imgArray: state.imgArray.concat(response.data.data)
        imgArray: response.data.data,
        total_count: response.data.pagination.total_count,
        loaded_count: 0,
      });
      loading(true);
    } catch (e) {
      console.log("error", e);
    }
  } 
  export default handleSubmit;