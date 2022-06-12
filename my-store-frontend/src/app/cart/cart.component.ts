import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService, ProductInCart, FormInputs } from '../services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentCart:ProductInCart[] = [];
  totalPrice:number = 0;

  formInputs:FormInputs = {
    fullName: '',
    address: '',
    creditCardNumber: ''
  }
  
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.currentCart = this.productService.getCart();
    this.totalPrice = this.productService.getCartTotal();
  }

  amountChange(currentProduct:ProductInCart): void {
    if(currentProduct.quantity == 0 || currentProduct.quantity === undefined) {  
      this.productService.removeProductFromCart(currentProduct);
      setTimeout(() => {
        alert(`${currentProduct.product.name} has been removed from your cart!`)
      }, 100)
    };
    this.currentCart = this.productService.getCart();
    this.totalPrice = this.productService.getCartTotal(); 

  }

  onSubmit(formInputs:NgForm):void {
    const submittedInfo = this.formInputs = {
      fullName: formInputs.value.fullName,
      address: formInputs.value.address,
      creditCardNumber: formInputs.value.creditCardNumber
    }
    this.productService.onCartSubmit(submittedInfo, this.totalPrice);
    // Empty and reset cart
    this.currentCart.length = 0;
    this.totalPrice = 0;
    this.formInputs = {
      fullName: '',
      address: '',
      creditCardNumber: ''
    }

  }
}