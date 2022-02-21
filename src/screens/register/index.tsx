import React, {useState} from 'react';

import {Text, ToastAndroid, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import {loginValidation, registerValidation} from '@/utils/validators';
import {Login, Register} from '@/types';
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

const initialValues: Register = {
  firstName: '',
  email: '',
  password: '',
};

type TProps = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterPage = ({navigation}: TProps) => {
  const dispatch = useAppDispatch();

  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const onSubmit = async (values: Register) => {
    setApiLoading(true);
    try {
      console.log(values);
      const {user, error, token} = await kontenbase.auth.register(values);

      if (error) throw new Error(error.message);
      AsyncStorage.setItem('token', token);
      OneSignal.setExternalUserId(user?._id);

      dispatch(setAuthToken({token}));
      dispatch(setAuthUser(user));
      navigation.replace('Webview', {token, urlPath: '/webview'});
    } catch (error: any) {
      console.log('err', error);
      ToastAndroid.show(`${error?.message}`, ToastAndroid.SHORT);
    } finally {
      setApiLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registerValidation,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  const isDisabled: boolean =
    !formik.values.email ||
    !formik.values.firstName ||
    !formik.values.password ||
    !!formik.errors.email ||
    !!formik.errors.firstName ||
    !!formik.errors.password ||
    apiLoading;
  return (
    <Layout title="Register">
      <View style={{marginTop: hp('5%')}}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <TextInput
            value={formik.values.firstName}
            onChangeText={formik.handleChange('firstName')}
            onBlur={formik.handleBlur('firstName')}
            placeholder="Enter your full name"
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <FormError>{formik.errors.firstName}</FormError>
          )}
        </FormControl>
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
            title="Sign Up"
            onPress={formik.handleSubmit}
            disabled={isDisabled}
            loading={apiLoading}
          />
        </FormControl>
        <FormControl style={{marginTop: 20}}>
          <FormLabel style={{alignSelf: 'center'}}>
            Already have account?{' '}
            <Text
              style={{color: colors.primary}}
              onPress={() => {
                navigation?.navigate('Login');
              }}>
              Log In
            </Text>
          </FormLabel>
        </FormControl>
      </View>
    </Layout>
  );
};

export default RegisterPage;
