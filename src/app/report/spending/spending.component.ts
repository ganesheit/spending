import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpendingFormComponent } from './form/spending-form/spending-form.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';
import { MatCardModule } from '@angular/material/card';
import { TableCardComponent } from '@shared/components/table-card/table-card.component';
import { NgScrollbar } from 'ngx-scrollbar';
import {
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { IColumnDef, ISpendingData } from './spending.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SpendingActionTypes } from './spending.component.const';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from './confirm-dialog/delete/delete.component';
import { AuthService } from '@core';

@Component({
  selector: 'app-spending',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgScrollbar,
    TableCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './spending.component.html',
  styleUrl: './spending.component.scss',
})
export class SpendingComponent {
 
  private firestore: Firestore = inject(Firestore);
  spendingDataSource!: Array<ISpendingData>;
  spendingColumnDefinitions: Array<IColumnDef> = [
    {
      def: 'date',
      label: 'Date',
      type: 'text',
    },
    {
      def: 'amount',
      label: 'Amount',
      type: 'text',
    },
    {
      def: 'category',
      label: 'Category',
      type: 'text',
    },
    {
      def: 'description',
      label: 'Description',
      type: 'text',
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn' },
  ];
  date = signal(new Date());
  month = computed(() => {
    return this.date().toLocaleString('default', { month: 'long' }) + ' ' + this.date().getFullYear();
  });

  // totalSpendingInThisMonth = computed(() => {
  //   console.log(this.spendingDataSource);
  //   return this.spendingDataSource?.reduce((acc, curr) => acc + parseInt(curr.amount ?? ''), 0);
  // });

  remaningDays = computed(() => {
    return 30 - this.date().getDate();
  });
  totalSpending!: number;
  
  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    this.getSpendingData();
    // this.totalSpendingInThisMonth();
  }

  async getSpendingData() {
    const userId = this.authService.currentUserValue.id;
    const spendingCollection = collection(this.firestore, `users/${userId}/spending`);
    const querySnapshot = await getDocs(spendingCollection);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    this.spendingDataSource = dataArray;
    this.totalSpending = this.spendingDataSource.reduce((acc, curr) => acc + parseInt(curr.amount ?? ''), 0);
  }

  openDialog(action: 'add' | 'edit', rowData?: ISpendingData) {
    let varDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      varDirection = 'rtl';
    } else {
      varDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(SpendingFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: {
        action,
        rowData
      },
      direction: varDirection,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === SpendingActionTypes.ADD) {
        this.getSpendingData();
        this.showNotification(
          'snackbar-success',
          'Spending added Successfully...!!!',
          'bottom',
          'center'
        );

        // );
      } else if (result === SpendingActionTypes.EDIT) {
        this.getSpendingData();
        this.showNotification(
          'snackbar-success',
          'Spending updated Successfully...!!!',
          'bottom',
          'center'
        );
      }

    });
  }
  editRow(row: any) {
    this.openDialog('edit', row);

    
  }
  
  deleteRow(rowData: any) {
    let varDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      varDirection = 'rtl';
    } else {
      varDirection = 'ltr';
    }
  const deleteDialog = this.dialog.open(ConfirmDeleteComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: rowData,
      direction: varDirection,
      autoFocus: false,
    });

    deleteDialog.afterClosed().subscribe((result) => {
      if (result === SpendingActionTypes.DELETE) {
        this.getSpendingData();
        this.showNotification(
          'snackbar-success',
          'Spending deleted Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  addSpending() {
    // to do
  }
}
