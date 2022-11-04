import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.scss']
})
export class CreateChecklistComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateChecklistComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  finishCreate() {
    this.dialogRef.close();
  }

}
