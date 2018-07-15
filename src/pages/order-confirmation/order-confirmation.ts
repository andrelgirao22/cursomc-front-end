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

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public cartService: CartService,
      public clienteService: ClienteService) {
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
 
}