import React, {useEffect, useState, useRef} from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import codePush from 'react-native-code-push';
import analytics from '@react-native-firebase/analytics';

import SplashScreen from '@screens/splash';
import MaintenanceScreen from '@screens/maintenance';
import Update from '@screens/update';
import Privacy from '@screens/privacyPolicy/privacy';
import Term from '@screens/privacyPolicy/term';

import {useAuthContext} from '@utils/context/auth';
import AuthNavigator from './auth';
import AppNavigator from './app';

const Stack = createStackNavigator();

const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const RootNavigator = () => {
  const routeNameRef = useRef();
  const [state, _] = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [updateAvail, setUpdateAvail] = useState(false);

  useEffect(() => {
    codePush.notifyAppReady();
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const update = await codePush.checkForUpdate();

      if (!update || update.failedInstall) {
        return;
      }

      setUpdateAvail(true);
    } catch (error) {
      console.log(error);
    }
  };

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#080522',
      background: '#fff',
    },
  };

  useEffect(() => {
    setTimeout(() => setLoading(state.loading), 100);
  }, [state.loading]);

  return (
    <NavigationContainer
      theme={myTheme}
      // ref={navigationRef}
      // onReady={() => {
      //   routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      // }}
      // onStateChange={async () => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef.current.getCurrentRoute().name;

      //   if (previousRouteName !== currentRouteName) {
      //     await analytics().logScreenView({
      //       screen_name: currentRouteName,
      //       screen_class: currentRouteName,
      //     });
      //   }
      //   routeNameRef.current = currentRouteName;
      // }}
    >
      <Stack.Navigator>
        {loading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : updateAvail ? (
          <Stack.Screen
            name="Update"
            component={Update}
            options={{headerShown: false}}
          />
        ) : state.maintenance ? (
          <Stack.Screen
            name="Maintenance"
            component={MaintenanceScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            {!state.token ? (
              <Stack.Screen
                name="Auth"
                component={AuthNavigator}
                options={{headerShown: false}}
              />
            ) : (
              <Stack.Screen
                name="App"
                component={AppNavigator}
                options={{headerShown: false}}
              />
            )}
          </>
        )}
        <Stack.Screen
          name="feedWebview"
          component={FeedWebview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Term"
          component={Term}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(RootNavigator);
