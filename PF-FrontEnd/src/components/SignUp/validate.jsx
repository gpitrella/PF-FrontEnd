import validator from 'validator';

export function validateUsername(input) {
    let errors = {};

    if (validator.isEmpty(input.username)){
            errors.username = "Add a uername"
            document.getElementById('username').classList.add('signup__group-incorrecto')
            document.getElementById('username').classList.remove('signup__group-correcto')
            document.querySelector('#username .signup__input-error').classList.add('signup__input-error-activo')
    } else if (input.username.length <= 3){
            errors.username = "Minimum of 3 characters"
            document.getElementById('username').classList.add('signup__group-incorrecto')
            document.getElementById('username').classList.remove('signup__group-correcto')
            document.querySelector('#username .signup__input-error').classList.add('signup__input-error-activo')
    } else if (!validator.matches(input.username, "^[a-z0-9_\.\-]*$")){
            errors.username = "Only a-z, _, ., and 0-9"
            document.getElementById('username').classList.add('signup__group-incorrecto')
            document.getElementById('username').classList.remove('signup__group-correcto')
            document.querySelector('#username .signup__input-error').classList.add('signup__input-error-activo')
    } else {
            document.getElementById('username').classList.add('signup__group-correcto')
            document.getElementById('username').classList.remove('signup__group-incorrecto')
            document.querySelector('#username .signup__input-error').classList.remove('signup__input-error-activo')
        }
    
  return errors
}

export function validateEmail(input) {
        const errosEmail = {}

        if (validator.isEmpty(input.email)){
                errosEmail.email = "Add an email"
                document.getElementById('email').classList.add('signup__group-incorrecto')
                document.getElementById('email').classList.remove('signup__group-correcto')
                document.querySelector('#email .signup__input-error').classList.add('signup__input-error-activo')
        } else if (!validator.isEmail(input.email)){
                errosEmail.email = "Insert a valid email adress"
                document.getElementById('email').classList.add('signup__group-incorrecto')
                document.getElementById('email').classList.remove('signup__group-correcto')
                document.querySelector('#email .signup__input-error').classList.add('signup__input-error-activo')
        } else {
                document.getElementById('email').classList.add('signup__group-correcto')
                document.getElementById('email').classList.remove('signup__group-incorrecto')
                document.querySelector('#email .signup__input-error').classList.remove('signup__input-error-activo')
            }
    
  return errosEmail
}

export function validatePassword(input) {
        const errosPassword = {}

        if (validator.isEmpty(input.password)){
                errosPassword.password = "Add a password"
                document.getElementById('password').classList.add('signup__group-incorrecto')
                document.getElementById('password').classList.remove('signup__group-correcto')
                document.querySelector('#password .signup__input-error').classList.add('signup__input-error-activo')
        } else if (input.password.length < 6){
                errosPassword.password = "Minimum of 6 characters"
                document.getElementById('password').classList.add('signup__group-incorrecto')
                document.getElementById('password').classList.remove('signup__group-correcto')
                document.querySelector('#password .signup__input-error').classList.add('signup__input-error-activo')
        } else if (validator.matches(input.password, '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$')){
                errosPassword.password = "At least one letter and one number"
                document.getElementById('password').classList.add('signup__group-incorrecto')
                document.getElementById('password').classList.remove('signup__group-correcto')
                document.querySelector('#password .signup__input-error').classList.add('signup__input-error-activo')
        } else {
                document.getElementById('password').classList.add('signup__group-correcto')
                document.getElementById('password').classList.remove('signup__group-incorrecto')
                document.querySelector('#password .signup__input-error').classList.remove('signup__input-error-activo')
            }
    
  return errosPassword
}

