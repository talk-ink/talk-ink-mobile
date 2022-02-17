import React, {useState, useEffect, useRef, useMemo} from 'react';

import {BackHandler, Image} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

import {StackActions} from '@react-navigation/routers';

import Layout from '@/components/Layout/index';
import {FRONTEND_URL} from 'react-native-dotenv';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigations/root';
import {removeAuthToken} from '@/utils/auth';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthToken} from '@/store/features/auth';

type TProps = StackScreenProps<RootStackParamList, 'Webview'>;

const Webview = ({navigation, route}: TProps) => {
  const {token, urlPath, absolutePath} = route.params || {};
  const webview = useRef(null);

  const [canGoBack, setCanGoBack] = useState(true);
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const usedToken: string = useMemo(() => {
    if (token) return token;
    if (!token && auth.token) return auth.token;
  }, [token, auth.token]);

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
    console.log(
      'token',
      `${FRONTEND_URL}${urlPath ?? '/webview'}?token=${usedToken}`,
    );
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [canGoBack]);

  const onMessageHandler = (event: WebViewMessageEvent) => {
    const parseData: {action: 'logout'} = JSON.parse(event.nativeEvent.data);
    if (parseData?.action === 'logout') {
      removeAuthToken();
      dispatch(setAuthToken({token: null}));
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
          uri: `${FRONTEND_URL}${urlPath ?? '/webview'}?token=${usedToken}${
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
