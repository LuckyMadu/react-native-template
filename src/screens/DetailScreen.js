import React from 'react';
import {View, Text, Button} from 'react-native';

const DetailScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen</Text>
      <Button
        title="Go to Detail Screen...again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to First Screen"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

export default DetailScreen;
