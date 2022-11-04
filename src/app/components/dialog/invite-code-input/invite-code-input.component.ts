import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Settings } from '../../general-settings/general-settings.component';

@Component({
  selector: 'app-invite-code-input',
  templateUrl: './invite-code-input.component.html',
  styleUrls: ['./invite-code-input.component.scss']
})
export class InviteCodeInputComponent implements OnInit {

  inviteCodeInput: string = ''

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<InviteCodeInputComponent>) { }

  ngOnInit(): void {
  }

  send() {
    this.db.collection<Settings>("settings").valueChanges().subscribe({
      next: (data) => {
        if(this.inviteCodeInput == data[0].invitation_code){
          this.dialogRef.close()
        }
      },
      error: (err) => {
        console.log("Error: " + err)
      }
    })
  }

}
