import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateChecklistComponent } from '../create-checklist/create-checklist.component';

class AreaData {
  name?: string
  checklists?: string[]
}

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.scss']
})

export class CreateAreaComponent implements OnInit {
  areaName: string = "";
  checklists: string[] = []

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<CreateAreaComponent>, @Inject(MAT_DIALOG_DATA) public data: AreaData) { }

  addChecklist() {
    var dialogRef = this.dialog.open(CreateChecklistComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log("result:" + result)
      if (result) {
        this.checklists.push(result)

        console.log(result)
      }
    })
  }

  finishCreate(): any {
    if (this.areaName != "" && this.checklists.length > 0) {
      return {name: this.areaName, checklists: this.checklists}
    }
  }

  ngOnInit(): void {
  }

}
