import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
import * as Updates from 'expo-updates';

const urlServer = 'https://5e7c-2405-4802-4e02-3710-404e-304-df84-3b91.ngrok-free.app'

const RecordingScreen = () => {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [start, setStart] = useState(false)
  const [progress, setProgress] = useState(0)
  const runTypeMessage = Updates.isEmbeddedLaunch
  ? 'This app is running from built-in code'
  : 'This app is running an update';

  const insets = useSafeAreaInsets();
  const iconProp = {
    size: 40,
    color: 'white',
    type: 'ionicon'
  }

  console.log(insets.top);
  const handleStartRecording = async () => {
    try {
      console.log("Requesting permissions ...");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording, status } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      console.log("Recording started", status);
      setStart(true)
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const handleStopRecording = async () => {
    console.log("Stopping recording");

    await recording.stopAndUnloadAsync();
    console.log(recording);

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    // await sound.setStatusAsync({ rate: 0.5 });
    console.log("status stop", status);
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updatedRecordings);
    setStart(false)
  };

  const handleUploadAudio = async() => {
    try {
      const formData = new FormData();
      formData.append('audio', {
        uri: recording.getURI(),
        name: 'audio.mp3',
        type: 'audio/mpeg',
      });
  
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(progress)
          setProgress(progress);
        },
      };
  
      const response = await axios.post(
        urlServer+'/upload',
        formData,
        config
      );
      
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  const handleSaveAudioFile = async () => {
    await MediaLibrary.requestPermissionsAsync();
    console.log(recording._uri);
    const asset = await MediaLibrary.saveToLibraryAsync(
      recording._uri
    );
  }

  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.containerTextBox}>
        <Text>{runTypeMessage}</Text>
        {recording && <Text>{recording.getURI()}</Text>}
      </View>
      <View style={styles.containerButtonBox}>
        <TouchableOpacity style={styles.buttonUpload} onPress={handleSaveAudioFile}>
          <Icon name="save-outline" type='ionicon' size={20} color='white'/>
        </TouchableOpacity>
        {
        !start ? 
        <TouchableOpacity style={styles.buttonRecording} onPress={handleStartRecording}>
          <Icon name="mic-outline" {...iconProp}/>
        </TouchableOpacity>
        :  
        <TouchableOpacity style={styles.buttonRecording} onPress={handleStopRecording}>
          <Icon name="mic-off-outline" {...iconProp}/>
        </TouchableOpacity>
      }

        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
        <TouchableOpacity style={styles.buttonUpload} onPress={handleUploadAudio}>
          <Icon name="cloud-upload-outline" type='ionicon' size={20} color='white'/>
        </TouchableOpacity>
        <Text>{progress}%</Text>
        </View>
      </View>
    </View>
  );
};

export default RecordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  containerTextBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtonBox: {
    width: "100%",
    height: 100,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 20,
    paddingVertical: 20,
  },
  buttonRecording: {
    backgroundColor: "red",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonUpload: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
