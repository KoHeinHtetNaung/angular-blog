import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {}

  

  upLoadImg(selectedImg: string, postData: any, formStatus: any, id: any) {
    let filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImg).then(() => {
      this.storage
        .ref(filePath) //
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then(() => {
        this.toastr.success('Data Inserted Successfully!');
        this.router.navigate(['/posts']);
      });
  }

  // saveData(postData: any) {
  //   this.afs
  //     .collection('posts')
  //     .add(postData)
  //     .then((url) => {
  //       this.toastr.success('Data Inserted Successfully!');
  //     });
  // }

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOneData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();  //fix
    // return this.afs.collection('posts').doc(id).valueChanges();  Org source code!.
  }

  updateData(id: any, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data Update Successfully!');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(postImgPath: any, id: any) {
    //
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      });
  }

  deleteData(id: any) {
    this.afs
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        this.toastr.warning('Data Deleted Successfully!');
      });
  }
}
