import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../model/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[]
  bucketUrl: string = API_CONFIG.bucketBaseUrl

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
    this.categoriaService.findAll().subscribe(response => {
      this.items = response
    }, error => {
      console.log(error)
    })
  }

}
