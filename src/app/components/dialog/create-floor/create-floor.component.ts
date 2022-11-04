import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CreateAreaComponent } from '../create-area/create-area.component';

interface Area {
  name: string,
  checklists: string[]
}

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.scss']
})
export class CreateFloorComponent implements OnInit {

  areas: Area[] = [];
  checklists_length: number[] = [];
  floor: number = 0

  constructor(public dialog: MatDialog, private db: AngularFirestore, private dialogRef: MatDialogRef<CreateFloorComponent>) {
  }

  ngOnInit(): void {
  }

  finishCreate() {
    var floorCollection = this.db.collection("floors")
    console.log(this.areas)

    if (this.floor != 0 && this.areas.length > 0) {
      for (var i = 0; i < this.areas.length; i++) {
        console.log(this.areas[i].checklists.length)
        this.checklists_length?.push(this.areas[i].checklists.length)
      }

      const docRef = floorCollection.doc().ref
      const id = docRef.id

      docRef.set({
        areas: this.areas,
        checklists_length: this.checklists_length,
        floor: this.floor as number,
        id: id
      }).then((val) => {
        console.log("floor created")
        this.dialogRef.close()
      }).catch((err) => {
        console.log(`Error occured: ${err}`)
      })
    } else {
      console.log("condition not met")
    }
  }

  addArea() {
    const dialogRef = this.dialog.open(CreateAreaComponent, {
      width: '100%',
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.areas.push(result)
        console.log(this.areas)
      }
    })
  }

}
