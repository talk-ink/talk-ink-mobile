import React, {useState, useEffect, useRef} from 'react';

import {BackHandler, Image} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

import {StackActions} from '@react-navigation/routers';

import Layout from '@/components/Layout/index';
import {FRONTEND_URL} from 'react-native-dotenv';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigations/root';

type TProps = StackScreenProps<RootStackParamList, 'Webview'>;

const Webview = ({navigation, route}: TProps) => {
  const {token, urlPath, absolutePath} = route.params;
  const webview = useRef(null);

  const [canGoBack, setCanGoBack] = useState(true);

  const onAndroidBackPress = () => {
    if (webview.current) {
      if (canGoBack) {
        webview.current.goBack();
      } else {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          BackHandler.exitApp();
        }
      }
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    console.log('token', `${FRONTEND_URL}${urlPath}?token=${token}`);
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [canGoBack]);

  const onMessageHandler = (event: WebViewMessageEvent) => {
    const parseData: {action: 'logout'} = JSON.parse(event.nativeEvent.data);
    if (parseData?.action === 'logout') {
      navigation.navigate('Login');
    }
  };

  return (
    <Layout>
      <WebView
        ref={webview}
        onLoadProgress={e => {
          setCanGoBack(e.nativeEvent.canGoBack);
        }}
        source={{
          uri: `${FRONTEND_URL}${urlPath}?token=${token}${
            absolutePath
              ? `&absolutePath=${encodeURIComponent(absolutePath)}`
              : ''
          }`,
        }}
        domStorageEnabled
        onMessage={onMessageHandler}
      />
    </Layout>
  );
};

export default Webview;
