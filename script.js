document.addEventListener("DOMContentLoaded",function () {// Empieza a escuchar apenas carga el documento
    
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const showHideButton = document.getElementById("show-hide");

    loginForm.addEventListener("submit", function(event){
        event.preventDefault(); //Para que no se actualice la pagina
        validateForm();
    })

    emailInput.addEventListener("blur", function(){// Al salir del form escucha el evento
        validateEmail();
    })

    emailInput.addEventListener("change", function(){ // Apenas escribimos limpia el error
        hideError(emailError);
    })
    
    passwordInput.addEventListener("change", function(){ // Apenas escribimos limpia el error
        hideError(passwordError);
    })
    
    confirmPasswordInput.addEventListener("change", function(){ // Apenas escribimos limpia el error
        hideError(confirmPasswordError);
    })

    // AUXILIARES
    showHideButton.addEventListener("click", function(){
        if(passwordInput.type == "password"){
            passwordInput.type = "text";
            confirmPasswordInput.type = "text";
        }else{
            passwordInput.type = "password";
            confirmPasswordInput.type = "password";
        }
    })

    function validateForm(){
        const emailValidation = validateEmail();
        const passwordValidation = validatePassword();
        const passwordsMatch = validatePasswordMatch();

        if(emailValidation && passwordValidation && passwordsMatch){
            saveToLocalStorage();
            alert("¡Has ingresado con exito!");
        }
    }
    
    function validateEmail() {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        
        if(!emailValido){
            console.log("El email es invalido");
            showError(emailError,"¡Ingrese un email valido!")
            return false;
        }
        return true;
    }
    
    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const hasUpperCase = /[A-Z]/.test(passwordValue);
        const hasLowerCase = /[a-z]/.test(passwordValue);
        const hasNumber = /[0-9]/.test(passwordValue);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
    
        if(passwordValue.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar){
            showError(passwordError,"¡La contraseña debe ser mayor a 8 caracteres y contener: una mayuscula, una minuscula, un numero y al menos un caracter especial (#!$@)!")
            return false;
        }
        return true;
    }
    
    function validatePasswordMatch(){
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();
        
        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError,"¡Las contraseñas no coinciden!")
            return false;
        }
        return true;
    }
    
    function showError(errorElement,message){
        errorElement.innerHTML = message;
        errorElement.style.display = "block";
    }
    
    function hideError(errorElement){
        errorElement.innerHTML = "";
        errorElement.style.display = "none";
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value.trim();
        localStorage.setItem("email",emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON(){
        return{
            "email": emailInput.value,
            "password": passwordInput.value
        };
    }
})
