import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('cpassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { mismatch: true }
    : null;
}