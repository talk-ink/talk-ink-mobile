import React, {useState, useEffect, useRef} from 'react';

import {BackHandler, Image} from 'react-native';
import {WebView} from 'react-native-webview';

import {StackActions} from '@react-navigation/routers';

import Layout from '@/components/Layout/index';
import {FRONTEND_URL} from 'react-native-dotenv';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigations/root';

type TProps = StackNavigationProp<RootStackParamList, 'Login'>;

const Webview = ({navigate, goBack}: TProps) => {
  const webview = useRef(null);

  const [canGoBack, setCanGoBack] = useState(true);

  const onAndroidBackPress = () => {
    if (webview.current) {
      if (canGoBack) {
        webview.current.goBack();
      } else {
        goBack();
      }
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [canGoBack]);

  return (
    <Layout>
      <WebView
        ref={webview}
        onLoadProgress={e => {
          setCanGoBack(e.nativeEvent.canGoBack);
        }}
        source={{
          uri: `${FRONTEND_URL}?webview=true`,
        }}
        domStorageEnabled
      />
      {/* <FAB
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 16,
          backgroundColor: colors.PRIMARY,
        }}
        icon={() => (
          <Image
            source={icons.arrowBackLight}
            style={{
              height: 20,
              width: 20,
            }}
            resizeMode="contain"
          />
        )}
        onPress={() => {
          navigation.dispatch(StackActions.pop(1));
        }}
      /> */}
    </Layout>
  );
};

export default Webview;
