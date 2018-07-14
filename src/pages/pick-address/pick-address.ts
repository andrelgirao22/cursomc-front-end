import { ClienteDto } from './../../model/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { ClienteService } from './../../services/cliente.service';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email) {

      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          console.log('response',response)
          this.items = response['enderecos']
        }, error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage')
          }
        })
    } else {
      this.navCtrl.setRoot('HomePage')
    }  
  }



}
