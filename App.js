import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import MainTabScreen from './src/screens/MainTabScreen';
import DrawerContent from './src/screens/DraweContent';
import SupportScreen from './src/screens/SupportScreen';
import SettingScreen from './src/screens/SettingScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';

import {AuthContext} from './src/components/context';

import RootStackScreen from './src/screens/RootStackScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        // setUserToken('abcd');
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (username === 'user' && password === 'pass') {
          try {
            console.log('called');
            userToken = 'abcd';
            await AsyncStorage.setItem('userToken', userToken);
          } catch (error) {
            console.log('error', error);
          }
        }
        dispatch({type: 'LOGIN', id: username, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log('error', error);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('abcd');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      console.log('userToken', userToken);
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log('error', error);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
