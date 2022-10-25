import { Inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { BROWSER_STORAGE } from '../utils/storage';
import { Observable } from 'rxjs';
import { UserMetadata } from 'firebase-admin/lib/auth/user-record';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, @Inject(BROWSER_STORAGE) private storage: Storage, private db: AngularFirestore) { }

  async GoogleAuth(): Promise<boolean> {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  async AuthLogin(provider: any): Promise<boolean> {
    var isSuccess: boolean = false;

    await this.afAuth.signInWithPopup(provider).then((result) => {
      var userUid = result.user?.uid;

      this.db.collection<User>("users").doc(userUid).ref.get().then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          if (data?.role == "admin") {
            this.storage.setItem("username", result.user?.displayName!)
            this.storage.setItem("user-photo", result.user?.photoURL!)
            this.storage.setItem("user-uid", result.user?.uid!)

            console.log('You have been logged in');
            isSuccess = true;
          } else {
            isSuccess = false;
            console.log("you're not an admin! please go away")
          }
        } else {
          this.db.collection("users").doc(userUid).ref.set({
            "username": result.user?.email,
            "email": result.user?.email,
            "full_name": result.user?.displayName,
            "role": "admin"
          }).then((_) => {
            this.storage.setItem("username", result.user?.displayName!)
            this.storage.setItem("user-photo", result.user?.photoURL!)
            this.storage.setItem("user-uid", result.user?.uid!)

            console.log('You have been logged in');
            isSuccess = true;
          }).catch((err) => {
            isSuccess = false;
            console.log("error: " + err);
          })
        }
      });
      // isSuccess = true;
    }).catch((error) => {
      isSuccess = false;
      console.log(error);
    })

    return isSuccess;
  }

  async logout(): Promise<boolean> {
    var isSuccess: boolean = false;
    await this.afAuth.signOut().then(() => {
      isSuccess = true;
    }).catch((err) => {
      console.log("Error occured: " + err);
      isSuccess = false;
    })

    return isSuccess;
  }

  public getUserUid(): string {
    return this.storage.getItem("user-uid") ?? "";
  }

  public getUsername(): string {
    return this.storage.getItem("username") ?? "";
  }

  public getPhotoProfile(): string {
    return this.storage.getItem("user-photo") ?? "";
  }

  public removeLoggedInData() {
    return this.storage.removeItem("user-uid");
  }

}
