import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit {

  postAray: Array<any> = [];

  constructor(private postService: PostsService) {

  }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postAray = val;
    })
  }

  onDelete(postImgPath: any, id: any) {
    this.postService.deleteImage(postImgPath, id);
  }
  
}
