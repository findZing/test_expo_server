import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

const urlServer = "https://5e7c-2405-4802-4e02-3710-404e-304-df84-3b91.ngrok-free.app";

const AudioFileItem = ({ name, data }) => {
  const [recording, setRecording] = useState();
  const audioDirectory = FileSystem.documentDirectory;
  const [sound, setSound] = useState()

  const handlePlaySound = async () => {
    console.log(recording)
    const {sound} = await Audio.Sound.createAsync({uri: recording})
    setSound(sound)
    await sound.playAsync()
  }

  const handleStopSound = async () => {
    await sound.unloadAsync()
  }

  const handleSaveaAudioFile = async () => {
    await MediaLibrary.requestPermissionsAsync();
    console.log(recording);
    const asset = await MediaLibrary.saveToLibraryAsync(
      recording
    );
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const handleFunc = async () => {
      
      const bufferData = new Buffer(data)

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: 'data:audio/wav;base64,' + bufferData.toString('base64') });
      const directory = FileSystem.documentDirectory;
      const filePath = directory + name;

      setRecording(filePath);
      await FileSystem.writeAsStringAsync(
        filePath,
        bufferData.toString('base64'),
        { encoding: FileSystem.EncodingType.Base64 }
      );
    };
    handleFunc();
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontSize: 18 }}>{name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Button title="Save" onPress={handleSaveaAudioFile}/>
        {sound ? <Button title='Pause' onPress={handleStopSound}/> : <Button title="Play" onPress={handlePlaySound}/>}
      </View>
    </View>
  );
};
const HandleFileScreen = () => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await axios.get(urlServer + "/allaudio");
        setData(JSON.parse(res.request._response).data);
        // const data = new Buffer(res.request._response)
        // console.log(data.toString('base64'))
      } catch (error) {
        console.log("Get all failed");
      }
    };

    callApi();
  }, []);
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        {data.map((audioFile, index) => (
          <AudioFileItem
            key={index}
            name={audioFile.name}
            data={audioFile.audio}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HandleFileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
