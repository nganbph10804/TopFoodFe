import React, { Component } from 'react'
import { View, Text, Image ,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './style'

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
                       <Text style={(!item.seen)? styles.textBlue:styles.textNormal} numberOfLines={1}>{item.description}</Text>
                   </View>
                   {item.seen ? <View style={styles.bgSeen}>
                       <Image 
                           source={{uri: item.avatar}}
                           style={styles.avatarSeen}
                       />
                   </View> : <Text></Text>}
               </View>
           </TouchableOpacity>
       )
   }
}

export default Item