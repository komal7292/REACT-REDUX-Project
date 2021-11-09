import React from "react";
import Home from "./container/Home";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import ProfilePage from "./container/ProfilePage/ProfilePage";
// import { useHistory } from "react-router-dom";
// import Head from "./components/Head";

function App() {
  // const history = useHistory();
  // const data = localStorage.getItem("userDetails");
  // console.log("app", data);
  // useEffect(() => {
  //   if (data) {
  //     history.push("/home");
  //   } else {
  //     history.push("/");
  //   }
  // }, [data, history]);
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
