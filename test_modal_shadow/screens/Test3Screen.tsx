import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DATA = [
    {
      id: '1',
      title: 'First Item',
    },
    {
      id: '2',
      title: 'Second Item',
    },
    {
      id: '3',
      title: 'Third Item',
    },
    {
        id: '4',
        title: 'First Item',
      },
      {
        id: '5',
        title: 'Second Item',
      },
      {
        id: '6',
        title: 'Third Item',
      },
      {
        id: '7',
        title: 'First Item',
      },
      {
        id: '8',
        title: 'Second Item',
      },
      {
        id: '9',
        title: 'Third Item',
      },
      {
        id: '10',
        title: 'First Item',
      },
      {
        id: '11',
        title: 'Second Item',
      },
      {
        id: '12',
        title: 'Third Item',
      },
      {
        id: '13',
        title: 'First Item',
      },
      {
        id: '14',
        title: 'Second Item',
      },
      {
        id: '15',
        title: 'Third Item',
      },
      {
        id: '16',
        title: 'First Item',
      },
      {
        id: '17',
        title: 'Second Item',
      },
      {
        id: '18',
        title: 'Third Item',
      },
      {
        id: '19',
        title: 'First Item',
      },
      {
        id: '20',
        title: 'Second Item',
      },
      {
        id: '21',
        title: 'Third Item',
      },
      {
        id: '22',
        title: 'First Item',
      },
      {
        id: '23',
        title: 'Second Item',
      },
      {
        id: '24',
        title: 'Third Item',
      },
      {
        id: '25',
        title: 'First Item',
      },
      {
        id: '26',
        title: 'Second Item',
      },
      {
        id: '27',
        title: 'Third Item',
      },
      {
        id: '28',
        title: 'First Item',
      },
      {
        id: '29',
        title: 'Second Item',
      },
      {
        id: '30',
        title: 'Third Item',
      },
      {
        id: '31',
        title: 'First Item',
      },
      {
        id: '32',
        title: 'Second Item',
      },
      {
        id: '33',
        title: 'Third Item',
      },
      {
        id: '34',
        title: 'First Item',
      },
      {
        id: '35',
        title: 'Second Item',
      },
      {
        id: '36',
        title: 'Third Item',
      },
      {
        id: '37',
        title: 'First Item',
      },
      {
        id: '38',
        title: 'Second Item',
      },
      {
        id: '39',
        title: 'Third Item',
      },
      {
        id: '40',
        title: 'First Item',
      },
      {
        id: '41',
        title: 'Second Item',
      },
      {
        id: '42',
        title: 'Third Item',
      },

  ];

  type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const Test3Screen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Test3Screen</Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Test3Screen

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
})