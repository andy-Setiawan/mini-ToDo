import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Logo from "./img/TodoListLogo.png";
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      url:"https://boby-todo.herokuapp.com",
      checked: true
    };
  }

  onLogin = () => {
    axios
      .post(this.state.url+"/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        this.setState({ token: response.data.token })
      })
      .then(() => {
        Actions.ToDo({token:this.state.token, url:this.state.url});
      })
      .catch(function(error) {
        Alert.alert(error.response.data.message);
      });
  };

  render() {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
          <View style={styles.loginSideBox}>
            <View style={styles.logoBox}>
              <Image style={styles.logoSize} source={Logo} alt={Logo} />
              <Text style={styles.logoText}>LOGIN</Text>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                onChangeText={username => this.setState({ username })}
                style={styles.inputForm}
                placeholder="Username"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                onChangeText={password => this.setState({ password })}
                style={styles.inputForm}
                placeholder="Password"
                secureTextEntry
                returnKeyType="go"
                autoCapitalize="none"
                ref={input => (this.passwordInput = input)}
              />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onLogin}>
                <Text style={styles.buttonText} >
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.Register({url:this.state.url})}>
                <Text style={styles.buttonText}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#e4f1fe"
  },

  loginBox: {
    flex: 1,
    backgroundColor: "#c5eff7",
    borderRadius: 20,
    marginVertical: 30
  },

  loginSideBox: {
    flex: 1,
    backgroundColor: "#c5eff7",
    marginHorizontal: 30,
    marginVertical: -30,
    borderRadius: 20,
    padding: 20,
    alignItems: "stretch",
    justifyContent: "center"
  },

  logoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10
  },

  inputBox: {
    flex: 1,
    justifyContent: "flex-start"
  },

  logoSize: {
    width: 175,
    height: 175,
    marginBottom: 0
  },

  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginVertical: 10
  },

  inputForm: {
    borderRadius: 50,
    height: 50,
    backgroundColor: "#eeeeee",
    marginBottom: 10,
    paddingHorizontal: 20
  },

  buttonContainer: {
    backgroundColor: "#2c82c9",
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 20
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700"
  },

  inputLast: {
    flexDirection: "row",
    alignItems: "center"
  },

  checkboxPos: {
    marginVertical: 5
  },

  staySign: {
    paddingHorizontal: 15
  }
});
