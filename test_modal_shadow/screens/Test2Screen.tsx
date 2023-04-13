import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';

const Test2Screen = () => {
  return (
    <View style={styles.container}>
      <Shadow
        distance={20}
        startColor={'#eb9066d8'}
        endColor={'#ff00ff10'}
        offset={[1, 1]}
        paintInside={true}
        // sides='bottom'
        // corners='topStart'
        stretch={true}>
        <View style={{width: 100, height: 100, backgroundColor: 'black'}} />
      </Shadow>
    </View>
  );
};

export default Test2Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
