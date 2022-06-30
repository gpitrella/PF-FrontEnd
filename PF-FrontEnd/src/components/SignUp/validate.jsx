import validator from 'validator';

import React from 'react'



export function validateUsername(input) {
    let errors = {};

    if (validator.isEmpty(input.username)){
            errors.username = "Add a uername"
            document.getElementById('username').classList.add('signup__group-incorrecto')
            document.getElementById('username').classList.remove('signup__group-correcto')
            document.querySelector('#username .signup__input-error').classList.add('signup__input-error-activo')
    } else if (input.username.length <= 6){
            errors.username = "Minimum of 6 characters"
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

        if (validator.isEmpty(input.email)){
                errors.username = "Add a email"
                document.getElementById('email').classList.add('signup__group-incorrecto')
                document.getElementById('email').classList.remove('signup__group-correcto')
                document.querySelector('#email .signup__input-error').classList.add('signup__input-error-activo')
        } else if (!validator.isEmail(input.email)){
                errors.email = "Insert a valid email adress"
                document.getElementById('email').classList.add('signup__group-incorrecto')
                document.getElementById('email').classList.remove('signup__group-correcto')
                document.querySelector('#email .signup__input-error').classList.add('signup__input-error-activo')
        } else {
                document.getElementById('email').classList.add('signup__group-correcto')
                document.getElementById('email').classList.remove('signup__group-incorrecto')
                document.querySelector('#email .signup__input-error').classList.remove('signup__input-error-activo')
            }
    
  return errors
}

// export function validateEmail(input) {
//     let errors = {};

//     if (validator.isEmpty(input.email)){
//             errors.username = "Add a email"
//             document.getElementById('email').classList.add('signup__group-incorrecto')
//             document.getElementById('email').classList.remove('signup__group-correcto')
//             document.querySelector('#email .signup__input-error').classList.add('signup__input-error-activo')
//     } else if (!validator.isEmail(input.email)){
//             errors.email = "Insert a valid email adress"
//             document.getElementById('email').classList.add('signup__group-incorrecto')
//             document.getElementById('email').classList.remove('signup__group-correcto')
//             document.querySelector('#email .signup__input-error').classList.add('signup__input-error-activo')
//     } else {
//             document.getElementById('email').classList.add('signup__group-correcto')
//             document.getElementById('email').classList.remove('signup__group-incorrecto')
//             document.querySelector('#email .signup__input-error').classList.remove('signup__input-error-activo')
//         }
    
//   return errors
// }
