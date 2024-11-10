import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  categoryArray: Array<any> = [];
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId! : string 

  ngOnInit(): void {
    // this.categoriesService.loadData().subscribe(val => {
    //   this.categoryArray = val;
    // })

    this.categoriesService.loadData().subscribe(val =>{
      this.categoryArray = val;
    })
  }

  // onSubmit(formData:any) {
  //   let categoryData: Category = {
  //     category: formData.value.category,//
  //   }
  
  //   if(this.formStatus == "Add") {
  //     this.categoriesService.saveData(categoryData);
  //     formData.reset()
  //   }else if(this.formStatus == "Edit") {
  //     this.categoriesService.updateData(this.categoryId, categoryData);
  //     formData.reset();
  //     this.formStatus = "Add"
  //   }
  // }

  onSubmit(formData: any) {
    const categoryData: Category = {
      category: formData.value.categoryName,
    };

    if (this.formStatus == 'Add') {
      this.categoriesService.saveData(categoryData);
      formData.reset();
    } else if(this.formStatus == 'Edit') {
      this.categoriesService.updateData(this.categoryId , categoryData )
      formData.reset();
      this.formStatus = 'Add'
    }
  }

  onEdit(category: any, id:any) {
    this.formCategory = category;
    this.formStatus = "Edit";
    this.categoryId = id
  }

  

  onDelete(id: any) {
    this.categoriesService.deleteData(id)
  }

}
