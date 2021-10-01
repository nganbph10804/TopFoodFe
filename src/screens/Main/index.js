import React from 'react'
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export const index = () => {
    return (
      <View style={[t.bgBlue100, t.pY10]}>
        <Text>Hello, Mr. Nga</Text>
      </View>
    )
}
