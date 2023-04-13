import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Test1Screen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Modal Test</Text>

      <Button title='Open Modal 1' onPress={() => {navigation.navigate('Modal1')}}/>
      <Button title='Open Modal 2' onPress={() => {navigation.navigate('Modal2')}}/>
    </View>
  )
}

export default Test1Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    }
})