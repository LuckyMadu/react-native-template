import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay connected with everyone</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <LinearGradient
              colors={['#08D4C4', '#01AB9D']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get started</Text>
              <MaterialIcon name="navigate-next" color="#FFFFFF" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375A',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    flexDirection: 'row',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textSign: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
