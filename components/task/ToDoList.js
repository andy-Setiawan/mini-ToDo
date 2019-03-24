import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: []
    };
  }

  getData = () => {
    axios({
      method: "get",
      url: this.props.url + "/home",
      headers: {
        Authorization: this.props.token
      }
    })
      .then(response => this.setState({ task: response.data.data }))
      .then(() => this.props.getProgress());
  };

  componentDidMount() {
    this.getData();
    var date =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    var month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      taskDate: year + "-" + month + "-" + date
    });
  }

  onDeleteTask = key => {
    axios({
      method: "delete",
      url: this.props.url + "/erase",
      headers: {
        Authorization: this.props.token
      },
      data: {
        id: key
      }
    })
      .then(() => {
        this.getData();
      })
      .then(() => Actions.pop());
  };

  checkDetails = key => {
    Actions.Detail({
      token: this.props.token,
      idTask: key,
      url: this.props.url,
      deleteTask: this.onDeleteTask,
      getData:this.getData
    });
  };

  taskStatusCheck = key => {
    axios({
      method: "put",
      url: this.props.url + "/check",
      headers: {
        Authorization: this.props.token
      },
      data: {
        id: key
      }
    }).then(() => {
      this.getData();
    });
  };

  render() {
    return (
      <View style={styles.workContainer}>
        <ScrollView style={styles.workToday}>
          <Text style={styles.todayText}>Today</Text>
          <View style={styles.taskListBox}>
            {this.state.task.map((list, i) => {
              return (
                <View key={i} style={styles.listTaskBox}>
                  {list.isDone ? (
                    <Text
                      style={styles.doneTask}
                      onPress={() => this.taskStatusCheck(list._id)}
                    />
                  ) : (
                    <Text
                      style={styles.notdoneTask}
                      onPress={() => this.taskStatusCheck(list._id)}
                    />
                  )}
                  <Text
                    style={styles.listContent}
                    onPress={() => this.checkDetails(list._id)}
                  >
                    {list.content}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.inputBox}>
            <Icon
              type="FontAwesome"
              name="pencil"
              style={styles.inputButton}
              onPress={() =>
                Actions.InputTask({
                  url: this.props.url,
                  token: this.props.token,
                  getData: this.getData
                })
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 30,
    backgroundColor: "#4183d7"
  },

  todayText: {
    fontFamily: "MontserratAlternates-Medium",
    fontSize:20,
    color:"#FFFFFF",
    opacity: 0.7
  },

  doneTask: {
    marginTop: 5,
    backgroundColor: "#00e640",
    borderRadius: 50,
    width: 15,
    height: 15
  },

  notdoneTask: {
    marginTop: 5,
    backgroundColor: "#f22613",
    borderRadius: 50,
    width: 15,
    height: 15
  },

  taskListBox: {
    flex: 1
  },

  inputButton: {
    fontSize: 30,
    paddingLeft: 15,
    paddingTop: 8,
    zIndex: 11,
    color: "#FFFFFF"
  },

  inputBox: {
    backgroundColor: "#00e640",
    borderRadius: 50,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 5,
    right: 5
  },

  iconTask: {
    color: "#FFFFFF"
  },

  listTaskBox: {
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20
  },

  listContent: {
    marginLeft: 15
  }
});
