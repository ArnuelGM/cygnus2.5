import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupCustomerAddService } from './group-customer-add.service';

@Component({
	selector: 'page-group-customers-add',
	templateUrl: 'group-customers-add.html',
})
export class GroupCustomersAddPage {

	groupInfo: { nombre:string, customers: any[], _id:string, Type:string, _rev: string };
	clientes: any[];
	groupClientes: any[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _groupCustomerAdd: GroupCustomerAddService
	) {
		this.clientes = [];
	}

	ionViewWillEnter() {
		this.loadInfo();
	}

	async loadInfo() {
		await this.getGroupInfo();
		await this.obtenerClientes();
	}

	async getGroupInfo() {
		this.groupInfo = await this._groupCustomerAdd.db.get(this.navParams.get('groupId'));
		this.groupClientes = Array.from(this.groupInfo.customers);
		console.log('grupoClientes: ', this.groupClientes );
	}

	async obtenerClientes() {
		this.clientes = await this._groupCustomerAdd.obtenerClientes();
	}

	async change(customerId, ev) {
		const checked = ev.checked;
		if (checked) {
			let index = this.groupInfo.customers.indexOf(customerId);
			if (index > -1) {
				this.groupClientes.splice(index, 0, customerId);
			} else {
				this.groupClientes.push(customerId);
			}
		} else {
			this.groupClientes = this.groupClientes.filter(_id => _id != customerId);
		}
		return this.saveCustomerToGroup();
	}

	async saveCustomerToGroup() {
		this.groupInfo.customers = this.groupClientes;
		let rev = await this._groupCustomerAdd.save(this.groupInfo);
		if (rev.ok) {
			this.groupInfo._rev = rev.rev;
		}
	}

}
