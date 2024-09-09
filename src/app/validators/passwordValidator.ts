import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    const hasNumber = /\d/.test(value);   
    const hasLetter = /[a-zA-Z]/.test(value);  
    const valid = hasNumber && hasLetter;

    return !valid ? { invalidPassword: true } : null;
  };
}
