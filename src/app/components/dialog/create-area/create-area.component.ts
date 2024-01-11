import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateChecklistComponent } from '../create-checklist/create-checklist.component';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {arrayUnion} from "@angular/fire/firestore";

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

  constructor(private db: AngularFirestore, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateAreaComponent>, @Inject(MAT_DIALOG_DATA) public data: AreaData, @Inject(MAT_DIALOG_DATA) private floorData: any) { }

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

  createArea() {
    let floorRef = this.db.collection('floors').doc(this.floorData.floorId)

    try {
      floorRef.set({
        areas: arrayUnion({
          name: this.areaName, checklists: this.checklists
        })
      }, {merge: true}).then((_) => {
        console.log('ssdfs')
      })
    } catch (e) {
      console.log(`error: ${e}`)
    }
  }

  finishCreate(): any {
    if(this.floorData != undefined) {
      if (this.areaName != "" && this.checklists.length > 0) {
        this.createArea()
        return undefined;
      }
    } else {
      if (this.areaName != "" && this.checklists.length > 0) {
        return {name: this.areaName, checklists: this.checklists}
      }
    }
  }

  ngOnInit(): void {
  }

}
