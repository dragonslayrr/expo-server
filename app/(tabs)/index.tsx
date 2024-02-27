import { StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function Home() {
    useFonts({
        
    })

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title} darkColor="white" lightColor="white">
                    Welcome to Sol
                </Text>
                <View style={styles.separator} lightColor="rgba(255,255,255,0)" darkColor="rgba(255,255,255,0)" />
                <View style={styles.separator} lightColor="rgba(255,255,255,0)" darkColor="rgba(255,255,255,0)" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(../../assets/images/2layered-waves-haikei.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: "ExpletusSans",
        border: "2px white solid",
        padding: 10,
        backgroundImage: "url(../../assets/images/blurry-gradient-haikei.png)",
        backgroundSize: "cover",
        backgroundClip: "text",
        color: "rgba(0,0,0,0)",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    help: {
        fontSize: 20,
        color: "green",
    },
    accentShape: {
        borderRadius: 25,
        backgroundColor: "#111e36",
        height: "50%",
        width: "75%",
        display: "flex",
        alignContent: "space-around",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        padding: 15,
    },
    accentHeader: {
        color: "#b8b8b8",
        fontSize: 25,
        fontWeight: "bold",
    },
    accentSub: {
        color: "#d4d4d4",
        fontSize: 25,
        fontWeight: "bold",
    },
});