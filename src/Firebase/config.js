import * as firebase from 'firebase'
import 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyC0sZf8pwy37NdgxVsRu_LVr4H2Cx2gE0s",
  authDomain: "topfood-chat.firebaseapp.com",
  databaseURL: "https://topfood-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "topfood-chat",
  storageBucket: "topfood-chat.appspot.com",
  messagingSenderId: "142333678071",
  appId: "1:142333678071:web:e267a3d5073b194753def2",
  measurementId: "G-7W5SQXFGZM"
}
const fb = firebase.initializeApp(firebaseConfig);
export default fb;