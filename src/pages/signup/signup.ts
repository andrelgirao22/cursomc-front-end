import { AlertController } from 'ionic-angular';
import { ClienteService } from './../../services/cliente.service';
import { CidadeDto } from './../../model/cidade.dto';
import { EstadoDto } from './../../model/estado.dto';
import { EstadoService } from './../../services/estado.service';
import { CidadeService } from './../../services/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  estados: EstadoDto[]
  cidades: CidadeDto[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1',[Validators.required]],
        cpfOuCnpj: ['06134596280',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Via', [Validators.required]],
        numero: ['25', [Validators.required]],
        complemento: ['Apto 3',],
        bairro: ['Copacabana',],
        cep: ['10828333', [Validators.required]],
        telefone1: ['977261827', Validators.required],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      })

  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response
      this.formGroup.controls.estadoId.setValue(this.estados[0].id)
      this.updateCidades()
    }, error => {})
  }

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId
    this.cidadeService.findAll(estadoId).subscribe(response => {
      this.cidades = response
      this.formGroup.controls.cidadeId.setValue(null)
    }, error => {})
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk()
    }, error => {})
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop()
        }
      }]
    })

    alert.present()
  }

}
