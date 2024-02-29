import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { LoginInfo } from "../ExternalStorage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


let date = new Date();

let customDate = "";
let initial = false;

let showSelector: boolean = true

interface DataInterFace {
    steps: number;
    calories: number;
    avgspeed: number;
}

function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

//SECTION Handle Changing Dates

export default function Stats() {
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());
    const [statData, setStatData] = useState<DataInterFace>({ steps: 0, calories: 0, avgspeed: 0 });

    const LoggedIn = useSyncExternalStore(LoginInfo.Subscribe, LoginInfo.Get);

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                // @ts-ignore
                id: LoggedIn.id,
                date: `${month}/${day}/${year}`,
            }),
        };
        fetch("http://localhost:5000/stats/get", requestOptions)
            .then((data) => data.json())
            .then((Data) => {
                if (!Data["error"]) {
                    let steps = 0;
                    let calories = 0;
                    let avgspeed = 0;
                    // @ts-ignore
                    Data.forEach((item) => {
                        switch (item[1]) {
                            case "steps":
                                steps = item[2];
                                break;
                            case "calories":
                                calories = item[2];
                                break;
                            case "avgspeed":
                                avgspeed = item[2];
                                break;
                        }
                    });
                    setStatData({ steps, calories, avgspeed });
                }
            })
            .catch((Error) => {
                console.log(Error);
            });
    }, [day, LoggedIn]);

    // @ts-ignore
    window.setDay = setDay;
    // @ts-ignore
    window.setMonth = setMonth;
    // @ts-ignore
    window.setYear = setYear;

    function cycleDays(ctx: string) {
        switch (ctx) {
            case "PREVIOUS":
                if (day > 1) {
                    setDay(day - 1);
                } else if (month > 1) {
                    setMonth(month - 1);
                    setDay(daysInMonth(month - 1, year));
                } else {
                    setYear(year - 1);
                    setMonth(12);
                    setDay(daysInMonth(month, year));
                }
                break;
            case "NEXT":
                if (day < daysInMonth(month, year)) {
                    setDay(day + 1);
                } else if (month < 12) {
                    setMonth(month + 1);
                    setDay(1);
                } else {
                    setYear(year + 1);
                    setMonth(1);
                    setDay(1);
                }
                break;
        }
    }

    return (
        <>
            <View style={styles.container}>
                {showSelector && (
                    <>
                        {console.log(new Date().getDate())}
                        <RNDateTimePicker mode="date" value={new Date()} onChange={(event: DateTimePickerEvent, date?: Date) => {
                            console.log(date)
                        }}/>
                    </>
                )}
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => cycleDays("PREVIOUS")} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>  &lt;  </Text>
                    </Pressable>
                    <Text style={styles.title}>
                        STATISTICS FOR {month}/{day}/{year}
                    </Text>
                    <Pressable onPress={() => cycleDays("NEXT")} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>  &gt;  </Text>
                    </Pressable>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={styles.content}>
                    <View style={styles.popout}>
                        <View style={styles.contentHeader}>
                            <Text style={{fontWeight: "bold",fontSize: 20,fontFamily: "ExpletusSans"}}>Steps:</Text>
                            <FontAwesome5 name="shoe-prints" size={24} color="white" />
                        </View>
                        <Text style={{fontSize: 20,fontFamily: "HindRegular"}}>{statData.steps}</Text>
                    </View>
                    <View style={styles.popout}>
                        <View style={styles.contentHeader}>
                            <Text style={{fontWeight: "bold",fontSize: 20,fontFamily: "ExpletusSans"}}>Calories Burnt:</Text>
                            <FontAwesome5 name="heartbeat" size={24} color="white" />
                        </View>
                        <Text style={{fontSize: 20,fontFamily: "HindRegular"}}>{statData.calories}</Text>
                    </View>
                    <View style={styles.popout}>
                        <View style={styles.contentHeader}>
                            <Text style={{fontWeight: "bold",fontSize: 20,fontFamily: "ExpletusSans"}}>Average Speed:</Text>
                            <MaterialIcons name="speed" size={24} color="white" />
                        </View>
                        <Text style={{fontSize: 20,fontFamily: "HindRegular"}}>{statData.avgspeed} mph</Text>
                    </View>
                </View>
            </View>
            {/* <View style={styles.lightContainer}>
                <Text style={styles.lightText}>In case your interested your average speed in % speed of light was</Text>
                <Text style={styles.lightText}>{statData.avgspeed / 6.706e8}</Text>
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 25,
        backgroundImage: "url(../../assets/images/steps.png)", // make bigger cause too small
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "ExpletusSans"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    subtext: {
        fontSize: 30,
        color: "red",
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: ""
    },
    headerButton: {
        backgroundColor: "#09141d",
        marginRight: 20,
        marginLeft: 20,
        userSelect: "none",
    },
    headerButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "ExpletusSans"
    },
    statText: {
        fontSize: 20,
        fontFamily: "HindRegular"
    },
    lightText: {
        fontSize: 20,
        textAlign: "center",
    },
    lightContainer: {
        backgroundColor: "rgba(16,23,52,1)",
    },
    content: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    popout: {
        borderColor: "#faed69",
        borderWidth: 2,
        borderRadius: 20,
        height: 75,
        width: 300,
        padding: 10,
        margin: 10,
        backgroundColor: "rgba(11,26,37,1)",
        boxShadow: "5px 5px 25px black",
    },
    contentHeader: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "nowrap",
        backgroundColor:""
    }
});

