import { PedidoService } from './../../services/pedido.service';
import { EnderecoDto } from './../../model/endereco.dto';
import { ClienteDto } from './../../model/cliente.dto';
import { CartService } from './../../services/cart.service';
import { CartItem } from './../../model/cart-item';
import { PedidoDto } from './../../model/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/cliente.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDto
  cartItems: CartItem[]
  cliente: ClienteDto
  endereco: EnderecoDto
  codPedido: string

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public cartService: CartService,
      public clienteService: ClienteService,
      public pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido')
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items
    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDto
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']) 
    }, error => {
      this.navCtrl.setRoot('HomePage')
    })
  }

  private findEndereco(id: string, list: EnderecoDto[]): EnderecoDto {
    let position = list.findIndex(x => x.id == id)
    return list[position]
  }

  total() {
    return this.cartService.total()
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(response => {
      this.cartService.createOrClearCart()
      this.codPedido = this.extractId(response.headers.get('location'))
    }, error => {
      if(error.status == 403) {
        this.navCtrl.setRoot('HomePage')
      }
    })
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/')
    return location.substring(position + 1, location.length)
  }

  back() {
    this.navCtrl.setRoot('CartPage')
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage')
  }
 
}
