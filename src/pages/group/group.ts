import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupInfoService } from './group.service';
import { GroupCustomersAddPage } from '../group-customers-add/group-customers-add';

@Component({
	selector: 'page-group',
	templateUrl: 'group.html',
})
export class GroupPage {

	groupInfo;
	clientes;

	busqueda = '';
	clientesSearch;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _group: GroupInfoService
	) {
		this.groupInfo = {
			nombre: '',
			customers: []
		};
		this.clientes = [];
	}

	ionViewWillEnter() {
		this.getGroupInfo();
	}

	async getGroupInfo() {
		this.groupInfo = await this._group.getGroupInfo(this.navParams.get('groupId'));
		this.getCustomersGroup(this.groupInfo);
		console.log('groupinfo: ', this.groupInfo);
	}

	addCustomers() {
		this.navCtrl.push(GroupCustomersAddPage, {
			groupId: this.groupInfo._id
		});
	}

	async getCustomersGroup(groupInfo) {
		let clientesResult = await this._group.getCustomersGroup(groupInfo.customers);
		this.clientesSearch = clientesResult;
		this.clientes = clientesResult;
	}

	buscarCliente() {
		this.clientes = this.clientesSearch;
		if (this.busqueda && this.busqueda.trim() != '') {
			this.clientes = this.clientesSearch.filter((item) => {
				return (item.nombre.toLowerCase().indexOf(this.busqueda.toLowerCase()) > -1);
			});
		}
	}

}
