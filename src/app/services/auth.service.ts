import { Inject, Injectable } from '@angular/core'
import { GoogleAuthProvider } from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore'
import { BROWSER_STORAGE } from '../utils/storage'
import { Observable } from 'rxjs'
import { User } from '../models/user'
import { Key } from 'readline'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
  ) {}

  async UsernameAuth(username: string, password: string): Promise<boolean> {
    var isSuccess: boolean = false

    var col = this.db.collection<User>('users', (ref) =>
      ref.where('username', '==', username),
    )

    col.valueChanges().subscribe({
      next: (user) => {
        if (password == user[0].password) {
          this.storage.setItem('username', user[0].full_name!)
          this.storage.setItem('user-uid', user[0].user_id!)
          this.storage.setItem('login-with', 'username')

          isSuccess = true
        } else {
          this.snackbar.open('Password / username salah!', 'okay', {
            duration: 2000,
          })
        }
      },
      error: (err) => {
        this.snackbar.open('Err: ' + err, 'okay', {
          duration: 2000,
        })
      },
    })

    return true
  }

  async GoogleAuth(): Promise<boolean> {
    this.storage.setItem('login-with', 'google')
    return this.AuthLogin(new GoogleAuthProvider())
  }

  async AuthLogin(provider: any): Promise<boolean> {
    var isSuccess: boolean = false

    await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        var userUid = result.user?.uid

        this.db
          .collection<User>('users')
          .doc(userUid)
          .ref.get()
          .then((doc) => {
            if (doc.exists) {
              var data = doc.data()
              if (data?.role == 'admin') {
                this.storage.setItem('username', result.user?.displayName!)
                this.storage.setItem('user-photo', result.user?.photoURL!)
                this.storage.setItem('user-uid', result.user?.uid!)

                console.log('You have been logged in')
                isSuccess = true
              } else {
                isSuccess = false
                console.log("you're not an admin! please go away")
              }
            } else {
              this.db
                .collection('users')
                .doc(userUid)
                .ref.set({
                  username: result.user?.email,
                  email: result.user?.email,
                  full_name: result.user?.displayName,
                  role: 'admin',
                })
                .then((_) => {
                  this.storage.setItem('username', result.user?.displayName!)
                  this.storage.setItem('user-photo', result.user?.photoURL!)
                  this.storage.setItem('user-uid', result.user?.uid!)

                  console.log('You have been logged in')
                  isSuccess = true
                })
                .catch((err) => {
                  isSuccess = false
                  console.log('error: ' + err)
                })
            }
          })
        // isSuccess = true;
      })
      .catch((error) => {
        isSuccess = false
        console.log(error)
      })

    return isSuccess
  }

  async logout(): Promise<boolean> {
    var isSuccess: boolean = false
    await this.afAuth
      .signOut()
      .then(() => {
        isSuccess = true
      })
      .catch((err) => {
        console.log('Error occured: ' + err)
        isSuccess = false
      })

    return isSuccess
  }

  public getUserUid(): string {
    return this.storage.getItem('user-uid') ?? ''
  }

  public getUsername(): string {
    return this.storage.getItem('username') ?? ''
  }

  public getPhotoProfile(): string {
    return this.storage.getItem('user-photo') ?? ''
  }

  public getLoginWith(): string {
    return this.storage.getItem('login-with') ?? ''
  }

  public removeLoggedInData() {
    return this.storage.removeItem('user-uid')
  }
}
