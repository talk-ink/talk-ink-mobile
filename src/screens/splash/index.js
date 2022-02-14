import React, {useEffect, useState} from 'react';

import {StyleSheet, StatusBar, View, Image, Text, Linking} from 'react-native';
import {useTheme, Paragraph, Button} from 'react-native-paper';
import {useLazyQuery, useQuery} from '@apollo/client';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import codePush from 'react-native-code-push';

import images from '@assets/images';
import CDialog from '@components/molecules/dialog';

import {useAuthContext} from '@utils/context/auth';
import {GET_LOGGED_USER} from '@utils/apollo/constant/auth';
import {GET_CONFIGS} from '@utils/apollo/constant/others';
import {errorTemplate} from '@utils/index';
import {getAuthToken, removeAuthToken} from '@utils/auth';

const Splash = () => {
  const theme = useTheme();
  const [_, dispatch] = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);

  const [checkAuth] = useLazyQuery(GET_LOGGED_USER, {
    onCompleted: async ({user}) => {
      try {
        const token = await getAuthToken();

        dispatch({
          type: 'LOG_IN',
          token,
          user,
        });
      } catch (error) {
        console.log(errorTemplate('checkAuth', error));
      }
    },
  });

  const isShowFirstNotif = async () => {
    try {
      const localNotifStorage = await AsyncStorage.getItem('localNotif');

      if (!localNotifStorage) {
        const initLocalNotif = JSON.stringify({
          localNotifType: 'INITIAL_NOTIF',
          localNotifFirstShow: true,
        });
        AsyncStorage.setItem('localNotif', initLocalNotif);
      } else {
        const parsedLocalNotif = JSON.parse(localNotifStorage);
        dispatch({
          type: 'LOCAL_NOTIF_FROM_STORAGE',
          ...parsedLocalNotif,
        });
      }
    } catch (error) {
      console.log('isShowFirstNotif err', error);
    }
  };

  useQuery(GET_CONFIGS, {
    onError: () => {
      checkAuthKey();
    },
    onCompleted: data => {
      checkAuthKey(data);

      if (data?.configs?.[0]) {
        dispatch({
          type: 'SET_CONFIG',
          config: data?.configs?.[0],
        });
      }
    },
    fetchPolicy: 'network-only',
  });

  const checkAuthKey = async data => {
    if (!data?.configs?.[0]) {
      await removeAuthToken();

      // return;
      //pikirin gmn caranya kalau stuck disini kasih action atau apa
    }

    if (data?.configs?.[0]?.maintenance) {
      dispatch({type: 'MAINTENANCE', maintenance: true});
    } else {
      try {
        const response = await fetch(
          'https://play.google.com/store/apps/details?id=com.dumbways&hl=en',
        );

        console.log('awdawd', response.text);

        if (response.status !== 200) {
          throw 'Error checking app version';
        } else {
          const text = await response.text();
          const match = text.match(/Current Version.+?>([\d.]+)<\/span>/);
          let latestVersion;

          if (match) {
            latestVersion = match[1].trim();
          }

          const {appVersion} = await codePush.getConfiguration();

          console.log(appVersion);

          if (!latestVersion) {
            return;
          }

          const regex = /[.]/g;
          const version1 = parseInt(appVersion.replace(regex, ''), 10);
          const version2 = parseInt(latestVersion.replace(regex, ''), 10);
          if (version1 < version2) {
            setIsVisible(true);
          } else {
            checkAuth();
          }
        }
      } catch (err) {
        console.log({
          error: err,
          from: 'checkAuthKey',
        });
        checkAuth();
      }
    }
  };

  useEffect(() => {
    isShowFirstNotif();
  }, []);

  console.log(isVisible);

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.colors.surface}}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View>
        <Image
          source={images.logo}
          style={{marginBottom: 20, width: 159, height: 40}}
          resizeMode="contain"
        />
      </View>
      {/* <View style={{position: 'absolute', bottom: 20}}>
        <Text
          style={{
            fontSize: 14,
            fontStyle: 'italic',
            color: '#415B82',
            fontWeight: '600',
          }}>
          Powered by{' '}
          <Text style={{fontSize: 14, fontStyle: 'normal'}}>DumbWays</Text>
        </Text>
      </View> */}
      <CDialog
        visible={isVisible}
        content={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...theme.fonts.bold,
                  fontSize: 18,
                  marginBottom: 2,
                }}>
                Informasi
              </Text>
            </View>
            <Paragraph>
              {
                'Sepertinya Anda masih menggunakan DumbWays yang lama. Coba perbarui untuk dapat menikmati fitur terbaru.'
              }
            </Paragraph>
          </>
        }
        actions={
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Button
              mode="outlined"
              style={{
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary,
                marginLeft: 8,
                marginRight: 4,
              }}
              labelStyle={{
                color: 'white',
                letterSpacing: 0,
                lineHeight: 16,
              }}
              contentStyle={{height: 32}}
              onPress={() => {
                const handleUpdate = async () => {
                  try {
                    const supported = await Linking.canOpenURL(
                      'https://play.google.com/store/apps/details?id=com.dumbways',
                    );

                    if (supported) {
                      await Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.dumbways',
                      );
                    }
                  } catch (err) {
                    console.log(err);
                  }
                };

                handleUpdate();
              }}>
              Buka Playstore dan Update
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
