import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDto } from '../../model/cliente.dto';
import { CameraOptions, Camera } from '../../../node_modules/@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDto
  picture: string
  cameraOn: boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
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

  getCameraPicture() {
    
    this.cameraOn = true
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false
     
    }, (err) => {

    });
  }

  getCameraGaleryPicture() {
    
    this.cameraOn = true
    
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false
     
    }, (err) => {
      this.cameraOn = false
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture).subscribe(response => {
      this.picture = null
      this.loadData()
    }, error => {
      this.cameraOn = false
    })
  }

  cancelPicture() {
    this.picture = null
  }

}
