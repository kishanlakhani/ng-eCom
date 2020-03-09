import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories;
  product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: ''
  };
  productId: string = '';
  productSubscription: Subscription;

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
    // console.log(categoryService.getCategories());
    categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });

    this.productId = route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productSubscription = productService.getSingleProduct(this.productId).subscribe(x => {
        // console.log(x);
        this.product = {
          title: x['title'],
          price: x['price'],
          category: x['category'],
          imageUrl: x['imageUrl']
        };
      });
    }
  }

  save(product) {
    if (this.productId) {
      this.productService.update(product, this.productId);
    }
    else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }


  delete() {
    if (confirm("Are you sure you want to delet")) {
      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products']);

    }
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.productSubscription.unsubscribe();
  }


}
