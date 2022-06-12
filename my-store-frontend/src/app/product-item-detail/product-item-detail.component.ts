import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  selectedProduct:Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: ''
  }
  quantities:number[] = [];
  selectedQuantity:number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productService.getProducts().subscribe(async product => {
        this.selectedProduct = product.find(p => p.id === Number(params.get('id'))) as Product;
      })
    })
  }
}