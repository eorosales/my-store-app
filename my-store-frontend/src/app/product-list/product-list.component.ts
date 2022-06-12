import { Component, OnInit } from '@angular/core';
import { ProductInCart, ProductService } from '../services/product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] = [];
  quantities:number[] = [];
  selectedQuantity:number = 1;
  quantity:number = 0;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    })
    this.quantities = this.productService.setQuantities();
  }

  addProduct(selection:ProductInCart): void {
    const productAndQuantity = { 
      product: selection.product,
      quantity: selection.quantity
    }
    this.productService.addProductToCart(productAndQuantity);
  }

}