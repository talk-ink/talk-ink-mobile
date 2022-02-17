import React, {useState, useEffect, useRef, useMemo} from 'react';

import {BackHandler, Image, Linking} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

import {StackActions} from '@react-navigation/routers';

import Layout from '@/components/Layout/index';
import {FRONTEND_URL} from 'react-native-dotenv';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigations/root';
import {removeAuthToken} from '@/utils/auth';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthToken, setDeeplink} from '@/store/features/auth';
import OneSignal from 'react-native-onesignal';
import {getDeeplinkPath} from '@/utils/helper';

type TProps = StackScreenProps<RootStackParamList, 'Webview'>;

const Webview = ({navigation, route}: TProps) => {
  const {token, urlPath, absolutePath} = route.params || {};
  const webview = useRef(null);

  const [canGoBack, setCanGoBack] = useState(true);
  const [webviewUrl, setWebviewUrl] = useState<string>('');
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const usedToken: string = useMemo(() => {
    if (token) return token;
    if (!token && auth.token) return auth.token;
  }, [token, auth.token]);

  const goToAbsolutePath: string | null = useMemo(() => {
    if (absolutePath) return absolutePath;
    if (!absolutePath && auth.deeplink !== '/webview') return auth.deeplink;
    return null;
  }, [absolutePath, auth.deeplink]);

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
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [canGoBack]);

  const onMessageHandler = (event: WebViewMessageEvent) => {
    const parseData: {action: 'logout'; userId: string} = JSON.parse(
      event.nativeEvent.data,
    );
    if (parseData?.action === 'logout') {
      removeAuthToken();
      OneSignal.removeExternalUserId();
      dispatch(setDeeplink('/webview'));
      dispatch(setAuthToken({token: null}));
    }
  };

  useEffect(() => {
    if (!usedToken) return;

    console.log(
      `${FRONTEND_URL}${urlPath ?? '/webview'}?token=${usedToken}${
        goToAbsolutePath
          ? `&absolutePath=${encodeURIComponent(goToAbsolutePath)}`
          : ''
      }`,
    );

    setWebviewUrl(
      `${FRONTEND_URL}${urlPath ?? '/webview'}?token=${usedToken}${
        goToAbsolutePath
          ? `&absolutePath=${encodeURIComponent(goToAbsolutePath)}`
          : ''
      }`,
    );
  }, [urlPath, usedToken, goToAbsolutePath]);

  useEffect(() => {
    const callback = ({url}: {url: string}) => {
      const deeplinkPath = getDeeplinkPath(url.split('talk-ink://')[1]);
      setWebviewUrl(
        `${FRONTEND_URL}${urlPath ?? '/webview'}?token=${usedToken}${
          deeplinkPath
            ? `&absolutePath=${encodeURIComponent(deeplinkPath)}`
            : ''
        }`,
      );
    };
    Linking.addEventListener('url', callback);
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  return (
    <Layout>
      <WebView
        ref={webview}
        onLoadProgress={e => {
          setCanGoBack(e.nativeEvent.canGoBack);
        }}
        source={{
          uri: webviewUrl ? webviewUrl : undefined,
        }}
        domStorageEnabled
        onMessage={onMessageHandler}
      />
    </Layout>
  );
};

export default Webview;
