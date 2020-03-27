import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB9mL746JkvW0Ngkx6rp2e-nFmSvQJNNCg",
    authDomain: "my-bloger-8b202.firebaseapp.com",
    databaseURL: "https://my-bloger-8b202.firebaseio.com",
    projectId: "my-bloger-8b202",
    storageBucket: "my-bloger-8b202.appspot.com",
    messagingSenderId: "150722301128",
    appId: "1:150722301128:web:c91b1134be56a9c9d469fd",
    measurementId: "G-3S93M8S3KC"
  };

  var fire = firebase.initializeApp(config);
  export default fire;