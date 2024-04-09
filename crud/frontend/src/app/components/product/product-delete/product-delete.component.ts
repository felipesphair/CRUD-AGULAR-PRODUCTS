import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute ) { }


  ngOnInit(): void {
    const id = this.id()
    if (!id) {
      return this.cancel()
    }
    this.productService.readById(id).subscribe(product =>  {this.product = product })
  }

  id(): string {
    return this.route.snapshot.paramMap.get('id')
  }

  cancel(): void{ 
    this.router.navigate(['/products'])
  }
  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => this.productService.showMessage('Produto Deletado com Sucesso!'))
    this.router.navigate(['/products'])
  } 
}