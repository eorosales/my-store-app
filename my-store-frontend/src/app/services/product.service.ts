import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';

export interface ProductInCart {
  product: Product,
  quantity: number
}

export interface FormInputs {
  fullName: string,
  address: string,
  creditCardNumber: string
}

export interface ConfirmationItems {
  fullName: string,
  total: number
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products:Product[] = [];
  quantities:number[] = [1,2,3,4,5,6,7,8,9,10]
  productsInCart:ProductInCart[] = [];
  totalCost = 0;

  formInputs:FormInputs = {
    fullName: '',
    address: '',
    creditCardNumber: ''
  }

  confirmationItems = {
    fullName: '',
    total: 0
  }

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  setQuantities():number[] {
    return this.quantities;
  }

  getCart():ProductInCart[] {
    return this.productsInCart;
  }

  getConfirmationItems():ConfirmationItems {
    return this.confirmationItems;
  }

  addProductToCart(productAndQuantity:ProductInCart) {
    // Check if product already exists in the cart
    const productCheck = this.productsInCart.find(p => {
      return p.product.id === productAndQuantity.product.id
    })

    if(!productCheck) {
      this.productsInCart.push(productAndQuantity)
      alert(`${productAndQuantity.product.name} x ${productAndQuantity.quantity} added to your cart!`)
    } else {
      alert("Item already in cart!");
    }
    
  };

  getCartTotal():number {
    // Calculate each products total cost taking quantity multiplied by price
    const totalPricePerProduct = this.productsInCart.map(p => {
      return p.product.price * p.quantity
    })
    // Add the total cost of each product in the cart returning the sum of the cart 
    const sumOfProductsInCart = totalPricePerProduct.reduce((previousValue, currentValue) => 
      previousValue + currentValue, 0
    );
    return this.totalCost = Number(sumOfProductsInCart.toString().match(/^\d+(?:\.\d{0,2})?/));
  }

  removeProductFromCart(currentProduct:ProductInCart):ProductInCart[] {
    const updatedCart = this.productsInCart.filter(p => p !== currentProduct)
    return this.productsInCart = updatedCart;
  }

  onCartSubmit(inputs:FormInputs, total:number):ConfirmationItems {
    this.confirmationItems = {
      fullName: inputs.fullName,
      total
    }
    return this.confirmationItems;
  }
 
}