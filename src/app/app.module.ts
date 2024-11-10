import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import {AngularFireModule} from '@angular/fire/compat';
//import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
//import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/compat/storage' //for storage



// for toastr
import { ToastrModule } from 'ngx-toastr'; //for ngx-toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//

//kolkov/angular-editor need!
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environments.prod';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ToastrModule.forRoot(), //here
    BrowserAnimationsModule,
    HttpClientModule, //for kolkov/angular-editor
    AngularEditorModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
