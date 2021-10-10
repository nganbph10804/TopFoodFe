import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
  async saveJWT(valueToSave) {
    try {
      await AsyncStorage.setItem('jwt', valueToSave);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('jwt');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async deleteJWT() {
    try {
      await AsyncStorage.removeItem('jwt');
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
};

export default deviceStorage;
