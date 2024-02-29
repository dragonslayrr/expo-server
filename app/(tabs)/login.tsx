import { StyleSheet, TextInput, Button, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import React, { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { Text, View } from "../../components/Themed";
import { CONSTANTS, JSHash } from "react-native-hash";
import { LoginInfo } from '../ExternalStorage'
interface DataInterFace {
    id: number;
    email: string;
}

//SECTION Login/Signup Handler Functions

export default function Login() {
    const PasswordRef = useRef<any>(null);
    const EmailRef = useRef<any>(null);
    const [ServerData, SetServerData] = useState<DataInterFace>({ id: -1, email: "" });

    const LoggedIn = useSyncExternalStore(LoginInfo.Subscribe, LoginInfo.Get)

    async function hashPassword(password: string) {
        let hash = await JSHash(password, CONSTANTS.HashAlgorithms.sha256);
        return hash;
    }

    async function parseHash(password: string, hashedpassword: string) {
        if ((await hashPassword(password)) == hashedpassword) {
            return true;
        }
        return false;
    }

    function splitEmail(email: string): string {
        let user = email.split("@")[0];
        return user;
    }

    async function handleLogin() {
        if (PasswordRef.current && EmailRef.current) {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    email: EmailRef.current.value,
                    password: await hashPassword(PasswordRef.current.value),
                }),
            };
            fetch("http://localhost:5000/login/get", requestOptions)
                .then((data) => data.json())
                .then((Data) => {
                    if (!Data["error"]) {
                        setLogIn(true);
                        SetServerData(Data);
                        LoginInfo.Set(Data)
                    } else {
                        alert("Login failed. Email or password are incorrect");
                        PasswordRef.current.value = "";
                    }
                })
                .catch((Error) => {
                    console.log(Error);
                });
        }
    }
    async function handleSignup() {
        if (PasswordRef.current && EmailRef.current) {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    email: EmailRef.current.value,
                    password: await hashPassword(PasswordRef.current.value),
                }),
            };
            fetch("http://localhost:5000/login/add", requestOptions)
                .then((data) => data.json())
                .then((Data) => {
                    if (!Data["error"]) {
                        setLogIn(true);
                        SetServerData(Data);
                    }
                    // console.log(Data);
                    // alert("Signup Succeeded");
                })
                .catch((Error) => {
                    console.log(Error);
                });
        }
    }

    const [loggedIn, setLogIn] = useState(false);

    useEffect(() => {
        if (LoggedIn.id != -1) {
            setLogIn(true);
            SetServerData(LoggedIn);
        }
    }, []);

    //SECTION HTML DOCUMENT

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboard}>
            {(!loggedIn && (
                <View style={styles.container}>
                    <Text style={styles.title}>Login / Signup</Text>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <View style={styles.loginForm}>
                        <Text style={styles.loginText}>Email: </Text>
                        <TextInput
                            autoComplete="email"
                            textContentType="emailAddress"
                            inputMode="email"
                            keyboardType="email-address"
                            id="emailBox"
                            ref={EmailRef}
                            style={styles.loginFormContent}
                            placeholder="Email"
                        />
                        <Text id="passwordBox" style={styles.loginText}>
                            Password:{" "}
                        </Text>
                        <TextInput
                            textContentType="password"
                            ref={PasswordRef}
                            style={styles.loginFormContent}
                            placeholder="Password"
                            secureTextEntry
                        />
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
            )) || (
                <View style={styles.container}>
                    <Text style={styles.title}>Your Account</Text>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <Text style={styles.subtext}>Welcome {splitEmail(ServerData.email)}</Text>
                    <Pressable
                        onPress={() => {
                            setLogIn(false);
                            LoginInfo.Remove()
                        }}
                    >
                        <Text>Log Out</Text>
                    </Pressable>
                    <View></View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

//SECTION Stylesheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(../../assets/images/low-poly-grid-haikei.png)",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "ExpletusSans"
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
        fontFamily: "HindRegular"
    },
    keyboard: {
        flex: 1,
    },
    subtext: {
        fontSize: 25,
        paddingBottom: 25,
        fontFamily: "HindRegular"
    },
});

// VIEW = DIV SO SPAM VIEW (VIEW FUNNY)

// HASH PASSWORD DO NOT JUST SAVE IT DUMMY
//   npm i mssql
// https://www.npmjs.com/package/mssql
