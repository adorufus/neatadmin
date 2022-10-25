import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users?: User[];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<User>("users").valueChanges().subscribe({
      next: (data) => {
        this.users = data;
      }
    });

    
  }

}
