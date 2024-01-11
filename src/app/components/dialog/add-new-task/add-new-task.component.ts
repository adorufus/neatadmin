import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFirestore, DocumentReference, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {arrayUnion} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {type} from "os";

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {

  tasks: string[] = [""]

  constructor(private dialogRef: MatDialogRef<AddNewTaskComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private db: AngularFirestore) { }

  ngOnInit(): void {
    console.log(`${this.tasks}`)
  }

  finishCreate() {
    console.log(`current area index: ${this.data.areaIndex} ${this.data.floorId}`)
    let dataIndex = this.data.areaIndex

    let currentArea = this.db.collection(`floors`).doc(`${this.data.floorId}`).ref
    let areas: any[]

    currentArea.get().then(res => {
      areas = res.get('areas')

      console.log(areas[dataIndex].checklists)

      for(let task of this.tasks) {
        if(task != "") {
          areas[dataIndex].checklists.push(task)
        }
      }

      try {
        currentArea.set({areas}, {merge: true}).then((_) => {
          console.log(`Tasks successfully added`)
        })

        this.dialogRef.close();
      } catch (e) {
        console.log(`Tasks not added to checklists, reason: ${e}`)
      }
    })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onInputEnter(e: any) {
    console.log(e.target.value);

    if(e.target.value != "") {
      this.tasks.push("");

      console.log(this.tasks)

    }
  }

}
