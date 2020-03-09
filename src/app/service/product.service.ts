import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase, 
              private authService: AuthService,
              private http: HttpClient) { }

  create(product) {
    // console.log(this.authService.user$)
    // this.authService.user$.subscribe(x => {
      // console.log(x.uid);

    let uid = localStorage.getItem('uid');

      this.db.list('/products/' + uid).push(product);
    // });
  }

  update(product,productId){
    let uid = localStorage.getItem('uid');
    return this.db.object('/products/' + uid + '/' + productId).update(product);
  }

  delete(productId){
    let uid = localStorage.getItem('uid');
    return this.db.object('/products/' + uid + '/' + productId).remove();  
  }

  //for particular user all product
  getAll() {
      let uid = localStorage.getItem('uid');
      console.log(uid);
      return this.db.object('/products/' + uid).valueChanges();
  }

  //for show all product
  getAllProduct(){
    this.http.get('https://ng-ecommerce-b979f.firebaseio.com/products.json?title=Titanic').subscribe(r=>console.log(r));
    return this.db.object('/products').valueChanges();
  }

  getSingleProduct(productId){
    let uid = localStorage.getItem('uid');
    return this.db.object('/products/' + uid + '/' + productId).valueChanges();
  }
}
