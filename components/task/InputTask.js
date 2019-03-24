import React, { Component } from "react";
import { Text, View, TextInput, Picker, StyleSheet } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import ActionButton from "react-native-action-button";
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default class InputTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.url,
      taskNote: "",
      taskMain: "",
      priority: 3,
      current: "",
      taskDate: "",
      calendarShow: false
    };
  }

  datePicker = pickDate => {
    let day = pickDate.day < 10 ? "0" + pickDate.day : pickDate.day;
    let month = pickDate.month < 10 ? "0" + pickDate.month : pickDate.month;
    let year = pickDate.year;
    this.setState({ taskDate: year + "-" + month + "-" + day });
  };

  componentDidMount() {
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
      taskDate: year + "-" + month + "-" + date,
      current: year + "-" + month + "-" + date
    });
  }

  onInputTask = () => {
    axios({
      method: "post",
      url: this.state.url + "/add",
      headers: {
        Authorization: this.props.token
      },
      data: {
        content: this.state.taskMain,
        urgency: this.state.priority,
        dueDate: this.state.taskDate,
        note: this.state.taskNote
      }
    })
      .then(() => this.setState({ taskMain: "" }))
      .then(() => this.props.getData())
      .then(() => Actions.pop());
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.inputTaskText}>
            What task are you planning to perform ?
          </Text>
          <TextInput
            style={styles.inputTask}
            onChangeText={task => this.setState({ taskMain: task })}
            value={this.state.taskMain}
          />
        </View>
        <View style={styles.inputDateBox}>
          <View style={styles.dateBox}>
            <Text style={styles.inputTaskText}>Due Date :</Text>
            <Text
              style={styles.inputDate}
              onPress={() =>
                this.setState({ calendarShow: !this.state.calendarShow })
              }
              onChangeText={date => this.setState({ taskDate: date })}
            >
              {this.state.taskDate}
            </Text>
          </View>
          <View style={styles.priorityBox}>
            <Text style={styles.inputTaskText}>Priority :</Text>
            <Picker
              selectedValue={this.state.priority}
              style={styles.inputPriority}
              onValueChange={(itemValue) =>
                this.setState({ priority: itemValue })
              }
            >
              <Picker.Item label="High" value="3" />
              <Picker.Item label="Normal" value="2" />
              <Picker.Item label="Low" value="1" />
            </Picker>
          </View>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.inputTaskText}>Task Description : </Text>
          <TextInput
            style={styles.inputTask}
            multiline={true}
            numberOfLines={4}
            onChangeText={taskNote => this.setState({ taskNote })}
            value={this.state.taskNote}
          />
        </View>
        {this.state.calendarShow && (
          <Calendar onDayPress={this.datePicker} minDate={this.state.current} />
        )}

        <ActionButton
          buttonColor="#00e640"
          onPress={this.onInputTask}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#4183d7"
  },

  inputBox: {
    marginBottom: 10
  },

  inputTask: {
    borderRadius: 50,
    height: 50,
    backgroundColor: "#eeeeee",
    marginBottom: 10,
    paddingHorizontal: 20
  },

  inputTaskText: {
    opacity: 0.7,
    marginBottom: 5,
    color: "#FFFFFF"
  },

  inputDateBox: {
    marginBottom: 10,
    flexDirection: "row"
  },

  dateBox: {
    flex: 1,
    marginRight: 10
  },

  priorityBox: {
    flex: 1
  },

  inputDate: {
    borderRadius: 50,
    height: 50,
    backgroundColor: "#eeeeee",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  inputPriority: {
    height: 50,
    backgroundColor: "#eeeeee",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  }
});
