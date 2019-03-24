import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { Icon } from "native-base";
import * as Progress from "react-native-progress";
import { Actions } from "react-native-router-flux";
import axios from "axios";

export default class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      notDone: 0,
      task: [],
      date: ""
    };
  }

  componentDidMount() {
    this.getProgressData();

    var date = new Date().getDate();
    var monthIndex = new Date().getMonth();
    var year = new Date().getFullYear();
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.setState({
      date: month[monthIndex] + " " + date + ", " + year
    });
  }

  getProgressData = () => {
    axios({
      method: "get",
      url: this.props.url + "/home",
      headers: {
        Authorization: this.props.token
      }
    }).then(response => {
      let freeTask = 0;
      let doneTask = 0;
      if (response.data.data.length != 0) {
        freeTask = response.data.data.filter(list => list.isDone == false)
          .length;
        doneTask =
          response.data.data.filter(list => list.isDone == true).length /
          response.data.data.length;
      }
      this.setState({
        task: response.data.data,
        progress: doneTask,
        notDone: freeTask
      });
    });
  };

  render() {
    console.log(this.props.token);
    console.log(this.props.url);
    return (
      <View style={styles.todoContainer}>
        <View style={styles.userBox}>
          <View style={styles.profileBox}>
            <View style={styles.imageBox} />
            <View style={styles.userData}>
              <Text style={styles.userText}>Andy Setiawan</Text>
              <Text style={styles.jobText}>Junior Mobile Developer</Text>
              <Text style={styles.taskRemainder}>
                You have {this.state.notDone} tasks to do today
              </Text>
            </View>
          </View>
          <View style={styles.userTask}>
            <Text style={styles.dateText}>TODAY : {this.state.date}</Text>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <Swiper>
            <TouchableOpacity
              style={styles.taskBox}
              onPress={() =>
                Actions.ToDoList({
                  url: this.props.url,
                  token: this.props.token,
                  getProgress: this.getProgressData
                })
              }
            >
              <Icon type="FontAwesome" name="user" style={styles.iconTask} />
              <View style={styles.progressPosition}>
                <Progress.Circle
                  color="#2e3131"
                  unfilledColor="#bfbfbf"
                  borderWidth={0}
                  size={150}
                  progress={this.state.progress}
                  showsText={true}
                />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskLeftText}>
                  {this.state.notDone} TASK REMAINING
                </Text>
                <Text style={styles.taskCategoryText}>PERSONAL</Text>
              </View>
            </TouchableOpacity>
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#4183d7"
  },

  userBox: {
    flex: 1
  },

  userText: {
    color: "#FFFFFF",
    fontFamily: "MontserratAlternates-Medium",
    fontSize: 20,
    marginBottom: 5
  },

  jobText: {
    color: "#FFFFFF",
    fontFamily: "MontserratAlternates-Medium",
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.7
  },

  taskRemainder: {
    color: "#FFFFFF",
    fontFamily: "MontserratAlternates-Medium",
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.7
  },

  profileBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    padding: 30
  },

  imageBox: {
    borderRadius: 50,
    backgroundColor: "white",
    height: 75,
    width: 75
  },

  userTask: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30
  },

  dateText: {
    color: "#ffffff",
    fontFamily: "MontserratAlternates-Medium"
  },

  taskContainer: {
    flex: 2,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10
  },

  taskBox: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#eeeeee",
    justifyContent: "space-between",
    padding: 10
  },

  taskText: {
    flex: 1,
    justifyContent: "flex-end"
  },

  iconTask: {
    color: "#2c3e50"
  },

  progressPosition: {
    alignItems: "center"
  },

  taskLeftText: {
    color: "#2c3e50",
    fontFamily: "MontserratAlternates-Medium"
  },

  taskCategoryText: {
    color: "#2c3e50",
    fontFamily: "MontserratAlternates-Medium",
    fontSize: 25
  }
});
