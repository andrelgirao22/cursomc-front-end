import { CidadeService } from './../../services/cidade.service';
import { EstadoService } from './../../services/estado.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    EstadoService,
    CidadeService
  ]
})
export class SignupPageModule {}
