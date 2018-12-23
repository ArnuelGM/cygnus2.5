import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroupsPage } from '../form-groups/form-groups';
import { GroupPage } from '../group/group';
import { GroupsService } from '../form-groups/groups.service';

@Component({
	selector: 'page-groups',
	templateUrl: 'groups.html',
})
export class GroupsPage {


	grupos;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _groups: GroupsService
	) {
		this.grupos = [];
	}

	ionViewWillEnter() {
		this.obtenerGrupos();
	}

	async obtenerGrupos() {
		this.grupos = await this._groups.obtenerGrupos();
	}

	createGroup() {
		this.navCtrl.push( FormGroupsPage );
	}

	verGrupo(groupId) {
		this.navCtrl.push(GroupPage, {
			groupId: groupId
		});
	}

	cambiarNombre(groupId) {
		this.navCtrl.push(FormGroupsPage, {
			groupId: groupId
		});
	}

}
