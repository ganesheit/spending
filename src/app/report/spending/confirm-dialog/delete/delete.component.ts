import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ISpendingDialogData } from '../../spending.model';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';

export interface DialogData {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

@Component({
    selector: 'app-contact-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ]
})
export class ConfirmDeleteComponent {
  private fireStore: Firestore = inject(Firestore);

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISpendingDialogData,
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

   confirmDelete() {
    const documentId = this.data.id;
    deleteDoc(doc(this.fireStore, `spending/${documentId}`));
    this.dialogRef.close('delete');
  }
}
