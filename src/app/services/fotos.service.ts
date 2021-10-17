import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Storage } from '@ionic/storage';
import { User } from '../login/models/user.model';
import { Base64 } from '@ionic-native/base64/ngx';
import { SystemService } from '../utility/services/system.service';
import { Foto, tipoFoto } from '../models/foto.model';
import { File } from '@ionic-native/file/ngx';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FotosService {
  userId: string;

  constructor(
    private db: AngularFirestore,
    private file: AngularFireStorage,
    private storage: Storage,
    private system: SystemService,
    private nav: NavController,
    private Base64: Base64
  ) {}

  async initService() {
    this.userId = await this.storage.get('uid');
  }

  async upload(file: string[], tipo: tipoFoto) {
    const loading = await this.system.presentLoading('Subiendo imagenes');

    console.log(file);
    try {
      await loading.present();
      let url = [];
      let t = [];
      let base64Arr: any[] = [];
      const user: User = await this.getUser();

      for (let i = 0; i < file.length; i++) {
        let aux = await this.Base64.encodeFile(file[i]);
        aux = aux.split('\n').join('');
        aux = aux.split(';')[2];
        aux = aux.split(',')[1];
        base64Arr.push(aux);
      }
      console.log(base64Arr);
      for (let i = 0; i < base64Arr.length; i++) {
        const time = new Date();
        const r = await this.file
          .ref(`/foto/${user.uid}_${time}`)
          .putString(base64Arr[i], 'base64', { contentType: 'image/jpeg' });
        const urlImg = await r.ref.getDownloadURL();
        url.push(urlImg);
        t.push(time);
      }
      console.log(url, t);
      const fotoUsers = this.createFotoUser(url, t, user, tipo);

      fotoUsers.forEach(
        async (data) => await this.db.collection('foto').doc(data.id).set(data)
      );

      await this.system.presentToast('Se subido las fotos con exito');
    } catch (error) {
      this.system.presentToastError('');
    } finally {
      this.nav.back();
      await loading.dismiss();
    }
  }

  async getUser() {
    const uid = await this.storage.get('uid');
    const data = await this.db.collection('user').doc<User>(uid).ref.get();
    return data.data();
  }

  createFotoUser(
    urlArr: string[],
    time: Date[],
    user: User,
    tipo: tipoFoto
  ): Foto[] {
    const fotoUser = new Array<Foto>();

    urlArr.forEach((url, index) => {
      fotoUser.push({
        id: this.db.createId(),
        url,
        time: time[index],
        correo: user.correo,
        userId: user.uid,
        like: [],
        tipo,
      });
    });

    return fotoUser;
  }

  getFotos(tipo: tipoFoto) {
    return this.db
      .collection<Foto>('foto', (ref) => ref.where('tipo', '==', tipo))
      .valueChanges();
  }

  getFotosPorUsuario() {
    console.log(this.userId);
    return this.db
      .collection<Foto>('foto', (ref) => ref.where('userId', '==', this.userId))
      .valueChanges();
  }

  getFoto(id: string) {
    return this.db.collection<Foto>('foto').doc(id).valueChanges();
  }

  isLike(like: string[]) {
    return like.includes(this.userId);
  }

  async likeFoto(id: string, like: string[]) {
    const uid = await this.storage.get('uid');

    if (like.includes(uid)) like = like.filter((data) => data !== uid);
    else like.push(uid);

    try {
      await this.db.collection('foto').doc(id).update({ like });
    } catch (error) {
      this.system.presentToastError('');
    }
  }

  async getEstadisticas(tipo: tipoFoto) {
    let fotosRt = [];

    try {
      let ref = await this.db
        .collection<Foto>('foto')
        .ref.where('tipo', '==', tipo)
        .get();

      let fotos = ref.docs.map((data) => data.data());

      fotos = fotos.sort((a, b) => {
        if (a.like.length > b.like.length) return -1;
        if (a.like.length < b.like.length) return 1;
        return 0;
      });
      console.log(fotos);
      for (let i = 0; i < 3; i++) {
        if (fotos[i] && fotos[i].like.length >= 1) {
          fotosRt.push({
            ...fotos[i],
            correo: `${i + 1}- ${fotos[i].correo.split('@')[0]}`,
          });
        }
      }
    } catch (error) {
    } finally {
      console.log(fotosRt);
      return fotosRt;
    }
  }
}
