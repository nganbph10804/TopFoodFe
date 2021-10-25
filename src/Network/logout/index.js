import firebase from "../../Firebase/config";

const LogOutUser = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (error) {
    return error;
  }
};

export default LogOutUser;