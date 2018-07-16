import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public produtoService: ProdutoService,
    public loadingControl: LoadingController) {
  }

  ionViewDidLoad() {
   this.loadData()
  }

  loadData() {
    let categoriaId = this.navParams.get('categoriaId')
    let loader = this.presentLoading()

    this.produtoService.findByCategoria(categoriaId).subscribe(response => {
      this.items = response.content
      loader.dismiss()
      this.loadImageUrls()
    }, error => {
      loader.dismiss()
    })
  }

  loadImageUrls() {
    for(let i=0; i<this.items.length; i++) {
      let item = this.items[i]
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(reponse => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
      }, error => {})
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id})
  }

  presentLoading() {
    let loader = this.loadingControl.create({
      content: "Aguarde..."
    })
    
    loader.present()

    return loader
  }

  doRefresh(refresher) {
    this.loadData()
    setTimeout(() => {
      refresher.complete()
    }, 1000)
  }

}
