import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Picker } from "react-native";
import axios from "axios";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusDetail: true,
      dateT: "",
      taskContent: "",
      taskNote: "",
      priority: "",
      task: []
    };
  }

  componentDidMount() {
    this.findTaskbyId()
  }

  findTaskbyId = () => {
    axios({
      method: "get",
      url: this.props.url + "/home",
      headers: {
        Authorization: this.props.token
      }
    }).then(response => {
      let findTask = response.data.data.filter(
        list => list._id == this.props.idTask
      );
      this.setState({
        task: findTask,
        dateT: findTask[0].dueDate,
        taskContent: findTask[0].content,
        taskNote: findTask[0].note,
        priority: findTask[0].urgency
      });
    });
  };

  updateTask = key => {
    axios({
      method: "put",
      url: this.props.url + "/contentUpdate",
      headers: {
        Authorization: this.props.token
      },
      data: {
        id: key,
        content: this.state.taskContent
      }
    });
    axios({
      method: "put",
      url: this.props.url + "/noteUpdate",
      headers: {
        Authorization: this.props.token
      },
      data: {
        id: key,
        note: this.state.taskNote
      }
    });
    axios({
      method: "put",
      url: this.props.url + "/urgencyUpdate",
      headers: {
        Authorization: this.props.token
      },
      data: {
        id: key,
        urgency: this.state.priority
      }
    })
    .then(()=> {
      this.findTaskbyId()
    })
    .then(()=> {
      this.props.getData()
    })
    .then(() => {
      this.setState({ statusDetail: !this.state.statusDetail });
    });
  };

  render() {
    return (
      <View style={styles.detailContainer}>
        {this.state.statusDetail && (
          <View style={styles.detailBox}>
            {this.state.task.map((list, i) => {
              return (
                <View style={styles.taskListBox} key={i}>
                  <Text style={styles.taskText}>Your task today :</Text>
                  <Text style={styles.taskList}>{list.content}</Text>
                  <View style={styles.datePriority}>
                    <View>
                      <Text style={styles.taskText}>Priority :</Text>
                      <Text style={styles.taskList}>
                        {list.urgency == 3
                          ? "High"
                          : list.urgency == 2
                          ? "Normal"
                          : "Low"}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.taskText}>Due date :</Text>
                      <Text style={styles.taskList}>
                        {list.dueDate.substring(0, 10)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.taskText}>Task description :</Text>
                  <Text style={styles.taskList}>{list.note}</Text>
                  <View style={styles.buttonContainer}>
                    <Text
                      style={styles.editButton}
                      onPress={() =>
                        this.setState({
                          statusDetail: !this.state.statusDetail
                        })
                      }
                    >
                      EDIT
                    </Text>
                    <Text
                      style={styles.delButton}
                      onPress={() => this.props.deleteTask(this.props.idTask)}
                    >
                      DELETE
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        {!this.state.statusDetail && (
          <View style={styles.editBox}>
            <View style={styles.taskListBox}>
              <Text style={styles.taskText}>Your task today :</Text>
              <TextInput
                style={styles.taskList}
                onChangeText={task => this.setState({ taskContent: task })}
                value={this.state.taskContent}
              />
              <View style={styles.datePriority}>
                <View>
                  <Text style={styles.taskText}>Priority :</Text>
                  <Picker
                    selectedValue={this.state.priority}
                    style={styles.inputPriority}
                    onValueChange={itemValue =>
                      this.setState({ priority: itemValue })
                    }
                  >
                    <Picker.Item label="High" value="3" />
                    <Picker.Item label="Normal" value="2" />
                    <Picker.Item label="Low" value="1" />
                  </Picker>
                </View>
                <View>
                  <Text style={styles.taskText}>Due date :</Text>
                  <TextInput style={styles.taskList} editable={false}>
                    {this.state.dateT.substring(0, 10)}
                  </TextInput>
                </View>
              </View>
              <Text style={styles.taskText}>Task description :</Text>
              <TextInput
                style={styles.taskList}
                value={this.state.taskNote}
                onChangeText={taskNote => this.setState({ taskNote })}
              />
              <View style={styles.buttonContainer}>
                <Text
                  style={styles.editButton}
                  onPress={() => this.updateTask(this.props.idTask)}
                >
                  OK
                </Text>
                <Text
                  style={styles.delButton}
                  onPress={() =>
                    this.setState({ statusDetail: !this.state.statusDetail })
                  }
                >
                  CANCEL
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: "#4183d7",
    padding: 20
  },

  detailBox: {
  },

  taskListBox: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 10
  },

  taskText: {
    opacity: 0.7,
    color:"#FFFFFF",
    marginBottom: 5
  },

  taskList: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    padding: 15
  },

  datePriority: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  delButton: {
    borderRadius: 10,
    backgroundColor: "#cf000f",
    marginBottom: 10,
    padding: 15,
    color: "#FFFFFF"
  },

  editButton: {
    borderRadius: 10,
    backgroundColor: "#3498db",
    marginBottom: 10,
    padding: 15,
    color: "#FFFFFF",
    marginRight: 10
  },

  buttonContainer: {
    alignItems: "flex-end",
    flexDirection: "row"
  },

  inputPriority: {
    height: 50,
    width: 200,
    marginBottom: 10,
    backgroundColor:"#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15
  }
});
