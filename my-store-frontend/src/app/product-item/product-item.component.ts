import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { ProductInCart, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product = {
    id: 1,
    name: '',
    price: 0.00,
    url: '',
    description: ''
  }
  @Input() quantities:number[] = [];
  @Output() productAndQuantity = new EventEmitter();
  selectedQuantity:number = 1;

  constructor(private productService:ProductService) { }

  ngOnInit(): void { 
    this.product;
  }

  addProduct(product:Product, quantity:string) {
    const selection = { 
      product,
      quantity
    }
    this.productAndQuantity.emit(selection);
  }

}
