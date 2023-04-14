import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {showCustomAlert} from '../src/CustomAlert';

const HomeScreen = ({navigation}) => {
  const showAlertFromAlert = async () => {
    const modalHandler = await showCustomAlert(
      'Alert',
      'This alert was triggered from another alert',
      [
        {
          title: 'Show Another Alert',
          action: showAlertFromAlert,
        },
        {
          title: 'Close',
          action: () => {
            modalHandler.dismiss();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <Button
        title="Open Modal Test"
        onPress={() => navigation.navigate('ModalScreen')}
      />
      <Button
        title="Open Shadow Test"
        onPress={() => navigation.navigate('ShadowScreen')}
      />
      <Button
        title="Open FlatList Test"
        onPress={() => navigation.navigate('FlatListScreen')}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Button
          title="Show Modal"
          onPress={async () => {
            const modalHandler = await showCustomAlert(
              'Alert',
              'This is a custom alert triggered from the main screen',
              [
                {
                  title: 'Show Another Alert',
                  action: showAlertFromAlert,
                },
                {
                  title: 'Close',
                  action: () => {
                    modalHandler.dismiss();
                  },
                },
              ],
            );
          }}
        />
        <Button
          title="Enqueue 3 modals"
          onPress={async () => {
            const modalHandler = await showCustomAlert(
              'Alert',
              'This is an enqueued alert',
              [
                {
                  title: 'Close',
                  action: () => {
                    modalHandler.dismiss();
                  },
                },
              ],
              true,
            );
            const secondModalHandler = await showCustomAlert(
              'Alert',
              'This is the second enqueued alert',
              [
                {
                  title: 'Close',
                  action: () => {
                    secondModalHandler.dismiss();
                  },
                },
              ],
              true,
            );
            const thirdModalHandler = await showCustomAlert(
              'Alert',
              'This is the third enqueued alert',
              [
                {
                  title: 'Close',
                  action: () => {
                    thirdModalHandler.dismiss();
                  },
                },
              ],
              true,
            );
          }}
        />
      </View>
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
  },
});
