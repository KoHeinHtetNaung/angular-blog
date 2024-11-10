import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ToastrService } from 'ngx-toastr';//
import { error } from 'node:console';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }
  
  //CRUD = Create Read Update Delete



  // saveData(data:any) { //post
  //   this.afs.collection('category').add(data).then(docRef =>{ //collection = 
  //     console.log('resultCollection:', docRef)
  //     this.toastr.success('Data Inserted Successfully!')
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  // saveData(data:any) {
  //   return this.afs.collection('category').add(data).then(() => {
  //     this.toastr.success('Data Inserted Successfully!')
  //   })
  //   .catch (err => {
  //     console.log(err)
  //   })
  // }

  // loadData() { //get
  //   return this.afs.collection('category').snapshotChanges().pipe(
  //     map(action => {
  //       return action.map(a => {
  //         const data = a.payload.doc.data();  //
  //         const id = a.payload.doc.id;
  //         return {id, data}
  //       })
  //     })
  //   )
  // }

  saveData(data: any) {
    return this.afs.collection('category').add(data).then(() => {
      this.toastr.success('Data Inserted Successfully!')
    })
    .catch(error => {
      console.log(error)
    })
  }

  loadData() {
    return this.afs.collection('category').snapshotChanges().pipe(
      map( resust => {
        return resust.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, data}
        })
      })
    )
  }

  updateData(id: any, editData: any) {
    this.afs.doc(`category/${id}`).update(editData).then( () => {
      this.toastr.success('Data Updated Successfully!')
    })
  }

  deleteData(id: any) {
    this.afs.doc(`category/${id}`).delete().then(() => {
      this.toastr.error('Delete Data Successfully!')
    })
  }



  // updateData(id: any, editData: any) { //put
  //   this.afs.doc(`category/${id}`).update(editData).then(d => {
  //     this.toastr.success('Data Update Successfully!')
  //   })
  // }

  // updateData(id: any, editData: any) {
  //   this.afs.doc(`category/${id}`).update(editData).then(() => {
  //     this.toastr.success('Data Update Successfully!')
  //   })  
  // }

  // deleteData(id:any) { //delete
  //   this.afs.doc(`category/${id}`).delete().then(docRef => {
  //     this.toastr.success('Data Deleted Successfully!')
  //   })
  // }
}
