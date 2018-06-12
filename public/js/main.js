(function() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyA-5BBqCrLr0Y9T4BMoHv7m-3rBrcInCWI",
      authDomain: "proyectofirebase-bf7ad.firebaseapp.com",
      databaseURL: "https://proyectofirebase-bf7ad.firebaseio.com",
      projectId: "proyectofirebase-bf7ad",
      storageBucket: "proyectofirebase-bf7ad.appspot.com",
      messagingSenderId: "427842348247"
    };
    firebase.initializeApp(config);
    //Obtener elementos
    const preObject = document.getElementById("objeto");
    const ulList = document.getElementById("list");
    const txtEmail = document.getElementById("email");
    const txtPassword = document.getElementById("password");
    const btnLogin = document.getElementById("login");
    const btnSignup = document.getElementById("signup");
    const btnLogout = document.getElementById("logout"); 



//AUTENTICACIÓN
    //Añadir evento login 
    btnLogin.addEventListener('click', e => {
        console.log("entra")
        //Obtener email y password
       const email = txtEmail.value;
       const password = txtPassword.value;
       const auth = firebase.auth(); //Constante para almacenar el valor que nos va a dar la promise de firebase.auth
       //Sign in
       const promise = auth.signInWithEmailAndPassword(email, password);
       promise.catch(e => console.log(e.message));
    });

    //Añadir evento signup
    btnSignup.addEventListener('click', e => {
         //Obtener email y password
         //TODO: comprobar que el email sea real
       const email = txtEmail.value;
       const password = txtPassword.value;
       const auth = firebase.auth();
       //Sign in
       const promise = auth.createUserWithEmailAndPassword(email, password);
       promise.catch(e => console.log(e.message));
           
    });
    
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut(); //Loguea al usuario
    });

    //Añadir un listener en tiempo real, un vigilante. Atent de cualquier cambio de estado.
    firebase.auth().onAuthStateChanged(firebaseUser =>{ //La función callback que se da siempre que haya un cambio de estado del usuario
        if(firebaseUser) { //Si el usuario está logueado
            console.log(firebaseUser);
            btnLogout.classList.remove('invisible');
            ulList.classList.remove('invisible');

        } else {
            console.log('no logueado');
            btnLogout.classList.add('invisible');
            ulList.classList.add('invisible');
        }
    });


//SINCRONIZACIÓN A TIEMPO REAL CON DESDE EL JSON DE FIREBASE (se pinta desde el json) 
    //Crear referencias
    //Esta función .ref es la que nos va a dirigir a la raiz de nuestra base de datos  
    const dbRefObject = firebase.database().ref().child("objeto");
    const dbRefList = dbRefObject.child("Conciertos");

    //Sincronizar cambios objeto
    //El primero de los parámetros el el tipo de evento. EL segundo es la función callback, que es la que controla el evento, en este caso snap, que es una foto fija de lo que se ejecuta
    dbRefObject.on('value', snapshot => {
        // preObject.innerHTML = JSON.stringify(snapshot.val(),null, 3);
        console.log(snapshot.val()); 
    });

    //Sincronizar cambios lista conciertos
    dbRefList.on('child_added', snapshot => {
        const li = document.createElement("li");
        li.innerHTML = JSON.stringify(snapshot.val(),null, 3);
        ulList.appendChild(li);
        // ulList.innerHTML += `<li> ${snapshot.val()} </li>`
    });
} ());



// const sendBtn = document.querySelector('.send');
// let inputName = document.querySelector('#inputName');
// let concertBox = document.querySelector('.concertBox');
// let listBox = document.querySelector('.list')

// sendBtn.addEventListener('click', function (){
//     listBox.innerHTML += `<li class="listIndividual">${inputName.value}</li>`
//     inputName.value = '';
// })