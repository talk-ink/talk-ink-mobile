import React, {useState} from 'react';

import {Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import {loginValidation} from '@/utils/validators';
import {Login} from '@/types';
import {RootStackParamList} from '@/navigations/root';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {kontenbase} from '@/utils/customClient';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthToken, setAuthUser} from '@/store/features/auth';
import Layout from '@/components/Layout/LoginRegister/index';
import TextInput from '@/components/TextInput';
import FormControl from '@/components/Form/FormControl';
import FormLabel from '@/components/Form/FormLabel';
import FormError from '@/components/Form/FormError';
import BigButton from '@/components/Form/Button/BigButton';
import colors from '@/utils/themes/colors';
import OneSignal from 'react-native-onesignal';

const initialValues: Login = {
  email: '',
  password: '',
};

type TProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginPage = ({navigation}: TProps) => {
  const dispatch = useAppDispatch();

  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const onSubmit = async (values: Login) => {
    setApiLoading(true);

    try {
      console.log(values);
      const {user, error, token} = await kontenbase.auth.login(values);
      console.log(token, user?.id);
      if (error) throw new Error(error.message);
      AsyncStorage.setItem('token', token);
      OneSignal.setExternalUserId(user?.id);

      dispatch(setAuthToken({token}));
      dispatch(setAuthUser(user));
      navigation.navigate('Webview', {token});
    } catch (error) {
      console.log('err', error);
    } finally {
      setApiLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  const isDisabled: boolean =
    !formik.values.email ||
    !formik.values.password ||
    !!formik.errors.email ||
    !!formik.errors.password ||
    apiLoading;

  return (
    <Layout title="Login">
      <View style={{marginTop: hp('5%')}}>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <TextInput
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email && (
            <FormError>{formik.errors.email}</FormError>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextInput
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
            placeholder="Enter your password"
          />
          {formik.errors.password && formik.touched.password && (
            <FormError>{formik.errors.password}</FormError>
          )}
        </FormControl>
        <FormControl style={{marginTop: 20}}>
          <BigButton
            title="Login"
            onPress={formik.handleSubmit}
            disabled={isDisabled}
            loading={apiLoading}
          />
        </FormControl>
        <FormControl style={{marginTop: 20}}>
          <FormLabel style={{alignSelf: 'center'}}>
            Don't have an account?{' '}
            <Text
              style={{color: colors.primary}}
              onPress={() => {
                navigation?.navigate('Register');
              }}>
              Sign Up
            </Text>
          </FormLabel>
        </FormControl>
      </View>
    </Layout>
  );
};

export default LoginPage;
