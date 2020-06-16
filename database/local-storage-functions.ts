import AsyncStorage from '@react-native-community/async-storage';

export const setItemStorage = async (
  key: string,
  value: string | Record<string, any>,
) => {
  if (typeof value === 'string') {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Error', e);
    }
  }
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error', e);
  }
};

export const getItemStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error', e);
  }
};

export const parseItemStorage = (value: string) => JSON.parse(value);
