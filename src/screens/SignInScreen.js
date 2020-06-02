import React, {useState, useContext, Children} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {AuthContext} from '../components/context';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    checkTextInputChange: false,
    checkSecureTextEntry: true,
  });

  const {signIn} = useContext(AuthContext);

  const handleInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        checkTextInputChange: true,
      });
    } else {
      setData({
        ...data,
        checkTextInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        password: val,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      checkSecureTextEntry: !data.checkSecureTextEntry,
    });
  };

  const handleLogin = (username, password) => {
    console.log('called handlelogin');
    console.log('u', username);
    console.log('p', password);
    signIn(username, password);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375A" size={20} />
          <TextInput
            placeholder="Your email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleInputChange(val)}
          />
          {data.checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={18} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375A" size={20} />
          <TextInput
            placeholder="Your password"
            secureTextEntry={data.checkSecureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />

          {data.checkSecureTextEntry ? (
            <Feather
              name="eye-off"
              color="grey"
              size={20}
              onPress={() => updateSecureTextEntry()}
            />
          ) : (
            <Feather
              name="eye"
              color="grey"
              size={20}
              onPress={() => updateSecureTextEntry()}
            />
          )}
        </View>
        <Text
          style={{
            color: '#009387',
            fontSize: 14,
            marginTop: 20,
          }}>
          Forgot password?
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => handleLogin(data.email, data.password)}>
            <LinearGradient
              colors={['#08D4C4', '#01AB9D']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 10,
              },
            ]}>
            <Text style={styles.textSignUp}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  text_header: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375A',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375A',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textSignUp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387',
  },
});
