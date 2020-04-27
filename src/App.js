import React from "react";
import "./App.css";
import { Route, BrowserRouter } from 'react-router-dom'
// import Flickr from "./components";
import Groups from "./components/groups";
import Gallery from "./components/gallery";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Groups}/>
          <Route path='/:post_id' component={Gallery} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
