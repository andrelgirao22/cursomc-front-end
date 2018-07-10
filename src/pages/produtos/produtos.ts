import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../model/produto.dto';
import { ProdutoService } from '../../services/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDto[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId')
    this.produtoService.findByCategoria(categoriaId).subscribe(response => {
      this.items = response.content
    }, error => {})
  }

}
