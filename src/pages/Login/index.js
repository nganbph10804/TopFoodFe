import React, { useState } from 'react'
import { ImageBackground, StyleSheet, TextInput, Text, View, Alert,Image } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginImage from './../../assets/Login/img-login.png'
import fbIcon from './../../assets/Icon/facebook.png'
import ggIcon from './../../assets/Icon/google-plus.png'
const Login = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [isActive, setActive] = useState(false);

    return (
        <View style={styles.container}>
            <ImageBackground source={LoginImage} resizeMode="cover" style={styles.image}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#ffffff"
                        onChangeText={setUsername}
                        text={username}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true}
                        onChangeText={setPass}
                        text={pass}
                    />
                    <TouchableOpacity>
                    <Text style={styles.forgot}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <Button style={styles.buttonLogin}
                    color='#ffffff'
                    onPress={() => Alert.alert("hihi")}
                    >Login</Button>
                </View>
                <View style={styles.signUpView}>
                <Text style={styles.signupText}>Bạn là chưa có tài khoản? </Text> 
                <TouchableOpacity onPress={() => Alert.alert("hihi")}>
                    <Text style={styles.signupTextOrang}>Đăng kí ngay!</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    TextInput: {
        height: 38,
        paddingHorizontal: 20,
        margin: 5,
        backgroundColor: '#4c59a5',
        borderRadius: 20,
        color: '#ffffff',
    },
    signup:{
        textAlign: 'left',
        color: '#ffffff'
    },
    forgot: {
        textAlign: 'right',
        color: '#ffffff',
        marginRight: 5
    },
    loginWith:{
        fontSize:12,
        color: '#ffffff'
    },
    inputView: {
        marginTop: '80%',
        padding: 10

    },
    buttonView:{
        display:'flex',
        alignItems:'center',
        marginVertical: 20
    },
    buttonLogin: {
        backgroundColor: '#f95f3b',
        width: '50%',
        paddingHorizontal:10,
        borderRadius: 20,
        marginBottom: 5
    },
    fbButton:{
        marginTop: 10,
        backgroundColor: '#053db5',
        width: '30%',
        paddingHorizontal:10,
        borderRadius: 20
    },
    signUpView:{
        display: 'flex',
        flexDirection:'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent:'center'
    },
    socialBtn:{
        margin: 5
    },
    signupText:{
        color:'#ffffff',
        marginRight:10
    },
    signupTextOrang:{
        fontSize: 16,
        color: '#ed5c3f'
    }

});

export default Login
