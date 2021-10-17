import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { audioPath, audio } from '../AudioPath';
import { Vibration } from '@ionic-native/vibration/ngx';

declare var window: any;

/*
  Comandos utilizados:

  ionic cordova plugin add cordova-plugin-camera@5.0.1
  npm install @ionic-native/camera
  ionic cordova plugin add cordova-plugin-vibration
  npm install @ionic-native/vibration
  ionic cordova plugin add cordova-plugin-nativeaudio
  npm install @ionic-native/native-audio


  NOTA: Se tiene que llamar al metodo loadAudioAssets en
  el app.components.ts para cargar los path de los audio
  del AudioPath.ts
*/

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  constructor(
    public toastController: ToastController,
    private loadingController: LoadingController,
    private camera: Camera,
    private audio: NativeAudio,
    private vibration: Vibration
  ) {}

  loadAudioAssets() {
    try {
      for (let i = 0; i < audio.length; i++) {
        this.audio.preloadSimple(audio[i].name, audio[i].path);
      }
    } catch (error) {
      console.log('SystemServices - loadAudioAssets: ' + error);
    }
  }

  async playAudio(name: string) {
    await this.audio.play(name);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  async presentToastError(code: string) {
    let message = '';

    switch (code) {
      case 'auth/email-already-exists':
        message = 'Ya existe usuario registrado con ese email';
        break;
      case 'auth/internal-error':
        message = 'Error al conectarse al servidor';
        break;
      case 'auth/user-not-found':
        message = 'Credenciales incorrectas';
        break;
      case 'auth/invalid-email':
        message = 'Credenciales incorrectas';
        break;
      case 'auth/invalid-password':
        message = 'Credenciales incorrectas';
        break;
      case 'auth/wrong-password':
        message = 'Credenciales incorrectas';
        break;
      case 'no internet':
        message = 'El dispositivo no tiene conexion a internet';
        break;
      case 'Camara':
        message = 'Error camara';
        break;
      default:
        message = 'Error inesperado';
        break;
    }

    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'warning',
    });
    this.vibration.vibrate([200, 200, 200]);
    toast.present();
  }

  async presentLoading(message: string) {
    return await this.loadingController.create({
      message,
      animated: false,
      spinner: null,
    });
  }

  async getPicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetHeight: 640,
      targetWidth: 720,
    };
    try {
      const file = await this.camera.getPicture(options);

      const img = window.Ionic.WebView.convertFileSrc(file);

      return { img, file };
    } catch (error) {}
  }
}
