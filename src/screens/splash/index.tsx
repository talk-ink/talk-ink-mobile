import images from '@/assets/images';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthLoading, setAuthToken, setDeeplink} from '@/store/features/auth';
import {getAuthToken} from '@/utils/auth';
import React, {useEffect, useState} from 'react';

import {Image, Linking, Text, View} from 'react-native';
import {FRONTEND_URL} from 'react-native-dotenv';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const useMount = (func: () => any) => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl) {
        const splitUrl = initialUrl.split('talk-ink://');
        setUrl(splitUrl[1]);
      }
      setProcessing(false);
    };

    getUrlAsync();
  });

  return {url, processing};
};

const Splash = () => {
  const dispatch = useAppDispatch();
  const {url: initialUrl, processing}: {url: string; processing: boolean} =
    useInitialURL();

  const checkToken = async () => {
    try {
      const token = await getAuthToken();
      if (initialUrl) {
        const isLocalhost: boolean = !initialUrl.split(
          'http://localhost:3000',
        )?.[0];
        let manipulateUrl: string = initialUrl;

        if (isLocalhost) {
          manipulateUrl = initialUrl.replace(
            'http://localhost:3000',
            FRONTEND_URL,
          );
        }
        console.log(manipulateUrl, isLocalhost);
        dispatch(setDeeplink(manipulateUrl.split(FRONTEND_URL)[1]));
      }
      if (token) {
        dispatch(setAuthToken({token}));
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      // dispatch(setAuthLoading(false));
    }
  };

  useEffect(() => {
    if (!processing) {
      checkToken();
    }
  }, [processing]);

  return (
    <SafeAreaView style={{height: hp('100%')}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.brand}
          style={{width: wp('50%'), resizeMode: 'contain'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
