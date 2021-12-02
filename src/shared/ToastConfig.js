import React from 'react';
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message';

const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),

  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export function ToastConfig() {
  return (
    <>
      <Toast
        ref={ref => Toast.setRef(ref)}
        config={toastConfig}
        visibilityTime={1000}
        topOffset={40}
        autoHide={true}
      />
    </>
  );
}
