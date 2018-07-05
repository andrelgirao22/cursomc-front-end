import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../model/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(
      public navCtrl: NavController, 
      public menu: MenuController,
      private authService: AuthService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'))
      this.navCtrl.setRoot('CategoriasPage')
    }, error => {})
  }

}
