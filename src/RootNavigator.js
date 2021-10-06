import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StackNavigator } from './Stacknavigator.js';
import { DrawerContent } from './DrawerContent';
import MessageScreen from './screens/MessageScreen';
import { Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();
const imageLogo = {
  uri: 'https://lh3.googleusercontent.com/fife/AAWUweVL1U10W1QYG73DF8lN8VY2h13hQH7A9hLhL0Aba2nOwDknwCWwx__YJcbgdF-y0bysRVo4Kn8NQm3hvKAPzcBiRNCxmten6ElhxBF0wt_CPuSF89HoNWjQeXqC10Xm34hg4Eka3Y-6a9rBgiL71WQy1rZSls1jRLlTWOzVbE4gdNClPun1KldwZq9W4JMClxNQ2RytODkqDReV6iE4vBcBCzczU6WWuwHwVdZWwRr-o0dQsudADN-D8Pk3HY8cKPUWxqvGvumt3FfFOnf2dIlksyNMjks6tWsWH6EAIXYPIcV2QhrngcjPwxS76kZgNPgLAy08J7iAQShlYxEi6jWfP-Pjg6CJpzMGR_j0_L110aZMg0fAes68OPxb9jW5LQ-rqZhm0oLEodDW60KE7_atP7-A3HgHVoYU78o5FE2D7EMa5Fq5NSqO8RFM76QjnuQt3UMO9V0kiY9Uu1NikaIgCbkS22B9BaofwrBuLi5f5g1IkV2bhPmg6pbmHvFSZR9oa_46hzQHlkJmADi4r2N7b-2tvutyR4fHUXS1trWd1XqiEQ07jpnwSBgyiVuXueTOR8qtwemMsOAxytCMyInoa8RHoyjtAtceSN6s_Pphll7DYar8KjzmvMEJjNh7W46EBpFRVJeMjD9fS2GdVCIPLQtsJ-65oKnwvglySkAMdOWzz58aEstzbCZWbyhQjumyyrfW5EnnYaQ5DrY7069AgsA1uqw_xQ=w250-h238-p-k-nu-ft',
};
export const RootNavigator = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          title: 'TopFood',
          headerStyle:{
           height: 100,
           backgroundColor:'#283793'
            
          },
          headerTitle: ()=>(
            <Image resizeMode="contain" style={{width:100,height:50}} source={imageLogo}/>
          )
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="TopFood" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={MessageScreen} />
        <Drawer.Screen name="BookMarks" component={MessageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};