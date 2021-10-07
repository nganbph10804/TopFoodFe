import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        padding: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    bgAvatar: {
        flex: 2
    },
    avatar: {
        width: width * 15 / 100,
        height: width * 15 / 100,
        borderRadius: width * 10 / 100,
    },
    info: {
        flex: 8,
        flexDirection: 'column',
        paddingLeft: 10,
        justifyContent: 'center'

    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        paddingBottom: 3
    },
    bgSeen: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarSeen: {
        width: width * 5 / 120,
        height: width * 5 / 120,
        borderRadius: width * 2.5 / 100,
        position:'absolute',
        bottom:5
    },
    textBlue:{
        color :'blue',
        fontWeight: '700'
    },
    textNormal:{
        
    },
    avatarFr:{
        width: width * 5 / 10,
        height: width * 5 / 120,
        borderRadius: width * 2.5 / 100,
    }
})