import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Types } from '../../models/types';
import { GroupsService } from './groups.service';

@Component({
	selector: 'page-form-groups',
	templateUrl: 'form-groups.html',
})
export class FormGroupsPage {

	grupo;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _grupo: GroupsService
	) {
		this.grupo = {
			Type: Types.TYPE_GROUP,
			nombre: null,
			customers: []
		}
	}

	ionViewWillEnter() {
		this.obtenerGrupo();
	}

	async guardar() {
		await this._grupo.guardar(this.grupo);
		this.navCtrl.pop();
	}

	async obtenerGrupo() {
		if (!!this.navParams.get('groupId')) {
			this.grupo = await this._grupo.obtenerGrupo(this.navParams.get('groupId'));
		}
	}

}
