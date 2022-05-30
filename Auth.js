const signup = document.getElementById('signup')
const login = document.getElementById('login')
const signout = document.getElementById('signout')

// Import the functions you need for the app 
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlwKOL5aQklkhBvX4pf_Sihg8utkBBXs8",
    authDomain: "doublecash-7bc8b.firebaseapp.com",
    projectId: "doublecash-7bc8b",
    storageBucket: "doublecash-7bc8b.appspot.com",
    messagingSenderId: "916452622402",
    appId: "1:916452622402:web:f54f911039ebc89b442ddb",
    measurementId: "G-TF8HRHJT5J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);



// sign up a new user  

// starts here 
signup.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    // Data saved successfully!
                    window.location.href="homepage.html"
                    // alert('user created successfully');
    
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });
    });
    // ends here 

    // login to your account 

    login.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    // log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    // you can redirect user to homepage
                    window.location.replace('homepage.html')
                    // alert('user logged in successfully');

                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    });


    // sign out user 
    signout.addEventListener('click', (e) => {

    signOut(auth).then(() => {
           // Sign-out successful.
           alert('signout success')
           window.location.replace('index.html')
    }).catch((error) => {
        // An error happened.
    });
});

