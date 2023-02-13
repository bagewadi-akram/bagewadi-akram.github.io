
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyDzRuYbp7G0vOiglak_tf_v-kPzxcora1s",

    authDomain: "bagewadi-akram.firebaseapp.com",

    projectId: "bagewadi-akram",

    storageBucket: "bagewadi-akram.appspot.com",

    messagingSenderId: "180865121476",

    appId: "1:180865121476:web:5cb0631c300b16d90d1d91",

    measurementId: "G-CK4PT7RV5M"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
