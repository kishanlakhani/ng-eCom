import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products;
  filterProduct;
  constructor(private productService:ProductService) { 
      productService.getAll().subscribe((x:any)=>{
        this.products = [];
        this.filterProduct = [];
        for (const key in x) {
          console.log(x);
          if (x.hasOwnProperty(key)) {
            const element = x[key];
            this.products.push({key,...x[key]})
            this.filterProduct.push({key,...x[key]})
          }
        }
    });
  }

  filter(query:string){
    console.log(query);
    this.filterProduct =  query ?
                 this.products.filter(p=>String(p['title']).toLowerCase().includes(query.toLowerCase())) : this.products;        
  }

  ngOnInit(): void {
  }

}
