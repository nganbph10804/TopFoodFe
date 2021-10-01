import React, { useState } from 'react'
import { ImageBackground, StyleSheet, TextInput, Text, View, Alert,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
const Login = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const bgImage = {uri :"https://lh3.googleusercontent.com/u/0/d/19VynXbKqpdthwL3_GL52oq6Kw7wXRBrX=w1920-h937-iv1"};

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
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
