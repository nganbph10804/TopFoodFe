import { Entypo } from '@expo/vector-icons'
import React, { Component } from 'react'
import { View, Text, Image ,TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './../MessageItem/style'

class Item extends Component {
   render() {
       const {item} = this.props

       return (
           <TouchableOpacity onPress={()=>{}}>
               <View style={styles.container}>
                   <View style={styles.bgAvatar}>
                       <Image 
                           source={{uri: item.avatar}}
                           style={styles.avatar}
                       />
                   </View>
                   <View style={styles.info}>
                       <Text style={styles.name}>{item.name}</Text>
                   </View>
                   <TouchableOpacity>
                       <Entypo size={18} style={{marginTop:13}} name='dots-three-horizontal'/>
                   </TouchableOpacity>
               </View>
           </TouchableOpacity>
       )
   }
}

export default Item