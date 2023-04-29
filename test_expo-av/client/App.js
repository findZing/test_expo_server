import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RecordingScreen from "./screens/RecordingScreen";
import HandleFileScreen from "./screens/HandleFileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Updates from 'expo-updates';

// const urlServer = 'https://9553-27-76-236-105.ngrok-free.app'

const Tab = createBottomTabNavigator()
export default function App() {
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState()
  const [progress, setProgress] = useState(0)

  const runTypeMessage = Updates.isEmbeddedLaunch
  ? 'This app is running from built-in code'
  : 'This app is running an update';
  console.log(runTypeMessage)
  const [recordings, setRecordings] = useState([]);

  
  

  // const getRecordingLines = () => {
  //   return recordings.map((recordingLine, index) => {
  //     return (
  //       <View key={index} style={styles.row}>
  //         <Text style={styles.fill}>
  //           Recording {index + 1} - {recordingLine.duration}
  //         </Text>
  //         <Button
  //           title="Trim"
  //           style={styles.button}
  //           onPress={async () => {
  //             recordingLine.sound.replayAsync();
  //           }}
  //         />
  //       </View>
  //     );
  //   });
  // };

  // useEffect(() => {
    
  // }, [])

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Recording" screenOptions={{
          headerShown: false,
          tabBarIconStyle: {display: 'none'},
          tabBarItemStyle: {
            paddingVertical: 10
          },
          tabBarLabelStyle: {
            fontSize: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }
          
        }}
        
        >
          <Tab.Screen name="Recording" component={RecordingScreen} options={{tabBarIconStyle: {display: 'none'}}}/>
          <Tab.Screen name="Handle" component={HandleFileScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    // gap: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  fill: {
    flex: 1,
  },
});
