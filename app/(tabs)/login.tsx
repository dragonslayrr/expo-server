import { StyleSheet, TextInput, Button, Pressable } from "react-native";
import { useRef, useEffect, useState } from "react";
// import bcrypt from "bcrypt";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function Login() {
  const PasswordRef = useRef();
  const EmailRef = useRef();

  async function hashPassword(password: string): { hashedPassword: string; salt: string } {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
  }

  async function parseHash(hashedPassword: string, salt: string, password: string): boolean {
    return hashedPassword == (await bcrypt.hash(password, salt));
  }
  function handleLogin() {
    //   hashPassword();
    console.log(email);
  }

  function handleSignup() {
    console.log(PasswordRef.current.value);
  }
  function connectToSQLServer() {}
  useEffect(() => {
    connectToSQLServer();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Signup</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.loginForm}>
        <Text style={styles.loginText}>Email: </Text>
        <TextInput id="emailBox" ref={EmailRef} style={styles.loginFormContent} placeholder="Email" />
        <Text id="passwordBox" style={styles.loginText}>
          Password:{" "}
        </Text>
        <TextInput ref={PasswordRef} style={styles.loginFormContent} placeholder="Password" secureTextEntry />
        <View style={styles.loginButtonView}>
          <Pressable onPress={handleLogin} style={styles.loginButtons}>
            <Text>  Login  </Text>
          </Pressable>
          <Pressable onPress={handleSignup} style={styles.loginButtons}>
            <Text>  Signup  </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loginForm: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 25,
    height: "50%",
    width: "75%",
    display: "flex",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  loginFormContent: {
    backgroundColor: "#eee",
    width: "75%",
    color: "black",
    height: "5%",
  },
  loginButtonView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    height: "10%",
  },
  loginButtons: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#555",
    width: "40%",
    height: "100%",
  },
  loginText: {
    fontSize: 20,
  },
});

// VIEW = DIV SO SPAM VIEW (VIEW FUNNY)

// HASH PASSWORD DO NOT JUST SAVE IT DUMMY
//   npm i mssql
// https://www.npmjs.com/package/mssql
