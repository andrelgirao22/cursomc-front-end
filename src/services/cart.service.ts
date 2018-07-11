import { Cart } from './../model/cart';
import { StorageService } from './storage.service';
import { Injectable } from "../../node_modules/@angular/core";
import { ProdutoDto } from '../model/produto.dto';


@Injectable()
export class CartService {

    constructor(private storage: StorageService) {}
 
    createOrClearCart(): Cart {
        let cart: Cart = {items: []}
        this.storage.setCart(cart)
        return cart
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart()
        if(cart == null) {
            cart = this.createOrClearCart()
        }
        return cart
    }

    addProduto(produto: ProdutoDto): Cart {
        let cart: Cart = this.getCart()
        let position = cart.items.findIndex(item => item.produto.id === produto.id)
        if(position == -1) {
            cart.items.push({produto: produto, quantidade: 1})
        }

        this.storage.setCart(cart)
        return cart
    }

}