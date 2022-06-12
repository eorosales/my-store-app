import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-form-add-to-cart',
  templateUrl: './form-add-to-cart.component.html',
  styleUrls: ['./form-add-to-cart.component.css']
})
export class FormAddToCartComponent implements OnInit {
  @Input() selectedProduct:Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: ''
  }
  quantities:number[] = [];
  selectedQuantity:number = 1;

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.quantities = this.productService.setQuantities();
  }

  onSubmit(): void {
    const productAndQuantity = { 
      product: this.selectedProduct,
      quantity: this.selectedQuantity
    }
    this.productService.addProductToCart(productAndQuantity);
  }

}
