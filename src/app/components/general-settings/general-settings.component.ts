import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Settings {
  invitation_code: string
  settings_id?: string
}

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  invitationCode: string = ''
  settingsId: string = ''

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    var data = this.db.collection<Settings>("settings")

    data.valueChanges().subscribe({
      next: (data) => {
        this.invitationCode = data[0].invitation_code
        this.settingsId = data[0].settings_id ?? ""
      },
      error: (err) => {
        console.log("Error: " + err)
      }
    })
  }

  saveSettings() {
    this.db.collection<Settings>("settings").doc(this.settingsId).set({
      invitation_code: this.invitationCode
    })
  }

}
