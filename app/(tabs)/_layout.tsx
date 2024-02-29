import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { useColorScheme, StyleSheet, Text, Image } from "react-native";
import { LoginInfo } from '../ExternalStorage'
import Colors from "../../constants/Colors";
import React, { useEffect, useSyncExternalStore, useState } from "react";

const BARSTYLES = {
    backgroundColor: "#0F151A",
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconMat(props: { name: React.ComponentProps<typeof MaterialIcons>["name"]; color: string }) {
    return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIcon5(props: { name: React.ComponentProps<typeof FontAwesome5>["name"]; color: string }) {
    return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const LoggedIn = useSyncExternalStore(LoginInfo.Subscribe, LoginInfo.Get)
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerStyle: BARSTYLES,
                    tabBarStyle: BARSTYLES,
                    title: "Home",
                    headerTitle: "",
                    headerLeft: () => <Image style={styles.logo} source={require('../../assets/images/no_background_logo.png') as any}/>,
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                    headerRight: () => <Link href="/(tabs)/login">
                      {/* @ts-ignore */}
                      {(LoggedIn  && <Text style={styles.username}>{LoggedIn.email.split("@")[0]}</Text>)}
                    </Link>,
                    // headerRight: () => (
                    //   <Link href="/modal" asChild>
                    //     <Pressable>
                    //       {({ pressed }) => (
                    //         <FontAwesome
                    //           name="info-circle"
                    //           size={25}
                    //           color={Colors[colorScheme ?? "light"].text}
                    //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    //         />
                    //       )}
                    //     </Pressable>
                    //   </Link>
                    // ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    headerStyle: BARSTYLES,
                    tabBarStyle: BARSTYLES,
                    title: "Stats",
                    headerTitle: "",
                    tabBarIcon: ({ color }) => <TabBarIcon name="signal" color={color} />,
                    headerLeft: () => <Image style={styles.logo} source={require('../../assets/images/no_background_logo.png') as any}/>,
                    headerRight: () => <Link href="/(tabs)/login">
                      {/* @ts-ignore */}
                      {(LoggedIn  && <Text style={styles.username}>{LoggedIn.email.split("@")[0]}</Text>)}
                    </Link>,
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    headerStyle: BARSTYLES,
                    tabBarStyle: BARSTYLES,
                    title: "Login",
                    headerTitle: "",
                    tabBarIcon: ({ color }) => <TabBarIconMat name="login" color={color} />,
                    headerLeft: () => <Image style={styles.logo} source={require('../../assets/images/no_background_logo.png') as any}/>,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
  username: {
    color: "#e5e5e7",
    paddingRight: 25,
    fontSize: 18,
    fontFamily: "HindRegular"
  },
  logo: {
    width: 50,
    flex: 1,
    marginLeft: 10,
  }
});