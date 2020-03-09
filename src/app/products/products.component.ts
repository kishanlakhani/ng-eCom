import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList  = [];
  categories;
  constructor(private productService: ProductService,private categoryService:CategoryService) {
    
    productService.getAllProduct().subscribe((p: {}) => {
      this.productList  = [];
      for (const key in p) {
        for (const key1 in p[key]) {
          this.productList.push({uid:key,pid:key1,...p[key][key1]});
        }
      }
    })

    categoryService.getCategories().subscribe(c=>{
      this.categories = c;
      console.log(this.categories);
    })
  }

  ngOnInit(): void {
  }

}
