import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { AuthService } from '@core';
import { SpendingCategories } from '../../spending.component.const';

@Component({
  selector: 'app-spending-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogClose,
    MatDialogContent,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './spending-form.component.html',
  styleUrl: './spending-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SpendingFormComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  spendingForm!: FormGroup;
  action!: string;
  spendingCategories = SpendingCategories;
  constructor(
    public dialogRef: MatDialogRef<SpendingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.spendingForm = this.fb.group({
      spending_date: new FormControl('', Validators.required),
      spending_amount: new FormControl('', Validators.required),
      spending_category: new FormControl('', Validators.required),
      spending_description: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.action = this.dialogData.action;
    if (this.action === 'edit') {
      const utcDate = convertToISODate(this.dialogData.rowData.date);
      this.spendingForm.patchValue({
        spending_date: utcDate,
        spending_amount: this.dialogData.rowData.amount,
        spending_category: this.dialogData.rowData.category,
        spending_description: this.dialogData.rowData.description,
      });
    }
  }
  async addSpending() {
    if (this.action === 'add') {
      const userId = this.authService.currentUserValue.id;
      const userDocRef = doc(this.firestore, `users/${userId}`);
      const spendingCollectionRef = collection(userDocRef, 'spending');
      const spendingObj = {
        date: moment(this.spendingForm.value.spending_date?.toString()).format(
          'DD-MM-YYYY'
        ), // Convert to ISO string for UTC,
        amount: this.spendingForm.value.spending_amount,
        category: this.spendingForm.value.spending_category,
        description: this.spendingForm.value.spending_description,
      };
      await addDoc(spendingCollectionRef, spendingObj);

    } else {
      this.updateSpending();
    }

    this.dialogRef.close('add');
    // to do
  }

  async updateSpending() {
    const spendingId = this.dialogData.rowData.id;
     const userId = this.authService.currentUserValue.id;
    const documentRef = doc(this.firestore, `users/${userId}/spending/${spendingId}`);
    await updateDoc(documentRef, {
      date: moment(this.spendingForm.value.spending_date?.toString()).format(
        'DD-MM-YYYY'
      ),
      amount: this.spendingForm.value.spending_amount,
      category: this.spendingForm.value.spending_category,
      description: this.spendingForm.value.spending_description,
    });

    this.dialogRef.close('edit');
  }
}


function convertToISODate(dateString: string): string {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
}