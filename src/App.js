import React from "react";
import Home from "./container/Home";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import ProfilePage from "./container/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/profilePage" component={ProfilePage}></Route>
      </Switch>
    </>
  );
}

export default App;
