import { EnderecoDto } from './../../model/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDto[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Monica",
        cep: "48293822",
        cidade : {
          id:"1",
          nome: "Uberlandia",
          estado: {
            id:"1",
            name: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alaxandre Toledo da Silva",
        numero: "405",
        complemento: null,
        bairro: "Centro",
        cep: "88933822",
        cidade : {
          id:"3",
          nome: "São Paulo",
          estado: {
            id:"2",
            name: "São Paulo"
          }
        }
      }
    ]

    
  }



}
