import { Component, OnInit } from '@angular/core';
import { ConfirmationItems, ProductService } from '../services/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  confirmationItems:ConfirmationItems = {
    fullName: '',
    total: 0
  }

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.confirmationItems = this.productService.getConfirmationItems();
  }

}
