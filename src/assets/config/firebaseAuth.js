import * as firebase from "firebase/app";
import { firebaseConfig } from './firebaseConfig';

const firebaseAuth = firebase.initializeApp(firebaseConfig);

export default firebaseAuth;  