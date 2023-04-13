import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      
      <Button title='Open Modal Test' onPress={() => navigation.navigate('ModalScreen')}/>
      <Button title='Open Shadow Test' onPress={() => navigation.navigate('ShadowScreen')}/>
      <Button title='Open FlatList Test' onPress={() => navigation.navigate('FlatListScreen')}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center', 
  }
});
