import images from '@/assets/images';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthLoading, setAuthToken} from '@/store/features/auth';
import {AppConfig} from '@/types';
import {getAuthToken} from '@/utils/auth';
import {axiosClient} from '@/utils/customClient';
import React, {useEffect, useState} from 'react';

import {Image, Linking, Text, View} from 'react-native';
import codePush from 'react-native-code-push';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';

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
  const tailwind = useTailwind();
  const dispatch = useAppDispatch();
  const {url: initialUrl, processing} = useInitialURL();

  const checkToken = async () => {
    try {
      const token = await getAuthToken();
      if (token) {
        dispatch(setAuthToken({token}));
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    // dispatch(setAuthLoading(!processing));
  }, [processing]);

  return (
    <SafeAreaView>
      <View style={tailwind('h-full bg-white items-center justify-center')}>
        <Image
          source={images.brand}
          style={{...tailwind('w-6/12'), resizeMode: 'contain'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
