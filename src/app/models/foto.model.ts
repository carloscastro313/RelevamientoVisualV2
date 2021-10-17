export interface Foto {
  id: string;
  url: string;
  time: Date | any;
  correo: string;
  userId: string;
  like: string[];
  tipo: tipoFoto;
}

export type tipoFoto = 'CosasLindas' | 'CosasFeas';
