import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {
  
  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private postService: PostsService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(val => {
      this.docId = val.id;
      if (this.docId) {
        this.postService.loadOneData(val.id).subscribe((post) => {
          this.post = post;

          this.postForm = this.formBuilder.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],

            permalink: [this.post.permalink, Validators.required],
            except: [
              this.post.except,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],

            content: [this.post.content, Validators.required],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      } else {
        this.postForm = this.formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          except: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
      
      
    })
  }

  categories: Array<any> = [];
  permalink: string = '';
  imgSrc: any = './assets/placeholder.png';
  selectedImg: any;

  postForm!: FormGroup;

  post: any;
  formStatus: string = 'Add New';
  docId: string = ''

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls; //controls == group of postForm
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    //console.log(title)
    this.permalink = title.replace(/\s/g, '*'); 
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    
    let splitted = this.postForm.value.category.split('-')

    const postData: Post | any = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      except: this.postForm.value.except,
      content: this.postForm.value.content,
    } 
    this.postService.upLoadImg(this.selectedImg, postData, this.formStatus, this.docId )
    this.postForm.reset();
    this.imgSrc = '././assets/placeholder.png';
  }

  

}
