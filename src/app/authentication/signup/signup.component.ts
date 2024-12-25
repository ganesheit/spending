import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { passwordMatchValidator } from '../helper/helper-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
  ],
})
export class SignupComponent implements OnInit {
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  private firestore: Firestore = inject(Firestore);

  authForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator }
  );
  showLoginMessage = false;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authForm.valueChanges.subscribe((data) => {
      console.log(data, 'form value cahnged', this.authForm.errors);
    });
  }

  get f() {
    console.log(this.authForm.controls);
    return this.authForm.controls;
  }

  get confirmPassword() {
    return this.authForm.get('cpassword');
  }

  async onSubmit() {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const userId = this.generateUserId();
      debugger
      await addDoc(usersCollection, {
        username: this.f['username'].value,
        password: this.f['password'].value,
        createdAt: new Date().toISOString(),
        userId: userId
      });
      this.showLoginMessage = true;
      this.snackBar.open('User added successfully', 'Close');
      this.authForm.reset();
      this.authForm.setErrors(null);
    } catch (error) {
      this.snackBar.open('Unexpected error. Please try again later', 'Close');
    }
  }

  generateUserId(): string {
    return 'user_' + Date.now().toString(36); // Generate a unique ID (example: user_x1y2z3abc)
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
