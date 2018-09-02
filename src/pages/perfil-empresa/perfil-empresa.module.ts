import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaPage } from './perfil-empresa';

@NgModule({
  declarations: [
    PerfilEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEmpresaPage),
  ],
})
export class PerfilEmpresaPageModule {}
