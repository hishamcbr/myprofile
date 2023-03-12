import firebase from "firebase/app";
import 'firebase/auth'; // for authentication
import 'firebase/storage'; // for storage
import 'firebase/database'; // for realtime database
import 'firebase/firestore'; // for cloud firestore
import 'firebase/messaging'; // for cloud messaging
import 'firebase/functions'; // for cloud functions
var config = {
    // apiKey: "AIzaSyDxmA4nUt1AWZWZLaMJ943mPuLHCG4-JKk",
    // authDomain: "vue-test-79a40.firebaseapp.com",
    // databaseURL: "https://vue-test-79a40.firebaseio.com",
    // projectId: "vue-test-79a40",
    // storageBucket: "",
    // messagingSenderId: "710174079953",
    // appId: "1:710174079953:web:28db90f1b45981b0"
    apiKey: "AIzaSyDJUQRfzmc1WepFf8FJcZ-OMDSzth35Ooc",
    authDomain: "ss-test-a5cfb.firebaseapp.com",
    databaseURL: "https://ss-test-a5cfb.firebaseio.com",
    projectId: "ss-test-a5cfb",
    storageBucket: "",
    messagingSenderId: "190719057519",
    appId: "1:190719057519:web:ed686b0dc27535d028379a"

};
firebase.initializeApp(config);

let messaging = null;
try {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    messaging.usePublicVapidKey("BNHE0ihB4_CRaTGJ4eQz-UMoTYu7Fy_8LzJawGXPoMjHEWrTBMHBWX5GMs66Wj7SS5tqkAFtgTfYNnVRKCIFT2Q");
  }
} catch (e) {}


// messaging.usePublicVapidKey("BJ0zKXl5T201S-XBHhqFDNabYFAE_lbKLOq9lCrtxRhUOMWyreU4_uWTW-2WXNxQznKAB19o1Vh5Z6eWcf6KhlU");


if (firebase.messaging.isSupported()){

}
else{
 messaging = ''
}
// messaging.requestPermission().then(() => {
//     console.log('Notification permission granted.');
//     firebase.messaging.getToken().then((token) => {
//         console.log(token);
//     })
// }).catch((err) => {
//     console.log('Unable to get permission to notify.', err);
// });

export {
    messaging
};