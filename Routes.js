import React , { Component }from "react";
import { Router, Scene } from "react-native-router-flux";
import ToDo from "./components/ToDo";
import LoginForm from "./components/LoginForm";
import InputTask from "./components/task/InputTask";
import Register from "./components/Register";
import ToDoList from "./components/task/ToDoList";
import Detail from "./components/task/Detail";

export default class Routes extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        token:''
     }
   }
   
  render() {
    return (
       
      <Router>
        <Scene key="root">
          <Scene key="LoginForm" component={LoginForm} hideNavBar initial/>
          <Scene key="ToDo" component={ToDo} hideNavBar />
          <Scene key="Register" component={Register} hideNavBar />
          <Scene key="InputTask" component={InputTask} hideNavBar />
          <Scene key="Detail" component={Detail} hideNavBar />
          <Scene key="ToDoList" component={ToDoList} hideNavBar />
        </Scene>
      </Router>
    );
  }
}
