import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthToken = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('token', key);
  } catch (error) {
    console.log(`setAuthToken`, error);
  }
};

export const getAuthToken = async (): Promise<string | null | undefined> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token ?? '';
  } catch (error) {
    console.log(`getAuthToken`, error);
  }
};

export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(`removeAuthToken`, error);
  }
};
