import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      username: "",
      password: "",
      email: ""
    };
  }

  onRegister = () => {
    axios
      .post(this.props.url + "/signup/", {
        fullname: this.state.fullname,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
      .then(function() {
        Actions.pop();
      })
      .catch(error => {
        Alert.alert(error.response.data.message);
      });
  };

  render() {
    return (
      <View style={styles.signupContainer}>
        <View style={styles.registerBox}>
          <View style={styles.fullNameBox}>
            <TextInput
              placeholder="Full name"
              style={styles.inputBox}
              autoCapitalize="none"
              onChangeText={fullname => this.setState({ fullname })}
            />
          </View>
          <View style={styles.userNameBox}>
            <TextInput
              placeholder="Username"
              style={styles.inputBox}
              autoCapitalize="none"
              onChangeText={username => this.setState({ username })}
            />
          </View>
          <View style={styles.passwordBox}>
            <TextInput
              placeholder="Password"
              style={styles.inputBox}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              secureTextEntry
            />
          </View>

          <View style={styles.emailBox}>
            <TextInput
              placeholder="Email Address"
              style={styles.inputBox}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.buttonBox} onPress={this.onRegister}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#c5eff7",
    alignItems: "center",
    padding: 20,
    justifyContent: "center"
  },

  inputBox: {
    borderRadius: 50,
    height: 50,
    width: 250,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 20,
    borderWidth:1,
    marginVertical:8
  },

  buttonBox: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10
  },

  registerButton: {
    borderRadius: 50,
    paddingTop: 10,
    fontSize: 15,
    textAlign: "center",
    height: 50,
    width: 200,
    backgroundColor: "#2c82c9",
    color: "#FFFFFF",
    fontFamily: "MontserratAlternates-Medium"
  }
});
