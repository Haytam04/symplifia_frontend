import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmpty = (control.value || '').trim().length === 0;
    const isValid = !isEmpty;
    return isValid ? null : { empty: true };
  };
}
