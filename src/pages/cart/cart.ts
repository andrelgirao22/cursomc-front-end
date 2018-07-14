import { ProdutoDto } from './../../model/produto.dto';
import { CartService } from './../../services/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/produto.service';
import { StorageService } from './../../services/storage.service';
import { CartItem } from './../../model/cart-item';
import { Cart } from './../../model/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart()
    this.items = cart.items
    this.loadImageUrls()
  }

  loadImageUrls() {
    for(let i=0; i<this.items.length; i++) {
      let item = this.items[i]
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(reponse => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`
      }, error => {})
    }
  }

  removeItem(produto: ProdutoDto) {
    this.items = this.cartService.removeProduto(produto).items
  }

  increaseQuantity(produto: ProdutoDto) {
    this.items = this.cartService.increaseQuantity(produto).items
  }

  decreaseQuantity(produto: ProdutoDto) {
    this.items = this.cartService.decreaseQuantity(produto).items
  }

  total(): number {
    return this.cartService.total()
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage')
  }

  checkout() {
    this.navCtrl.push('PickAddressPage')
  }
}
