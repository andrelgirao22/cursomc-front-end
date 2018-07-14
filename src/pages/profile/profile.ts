import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDto } from '../../model/cliente.dto';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDto

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
          this.cliente = response as ClienteDto
          this.getImageIfExist()
        }, error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage')
          }
        })
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }
  getImageIfExist() {
    this.clienteService.getImageFromBucket(this.cliente.id)
        .subscribe(response => {
          console.log('response', response)
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg` 
        }, 
        error => {})
  }

}
