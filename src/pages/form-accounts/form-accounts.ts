import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormAccountsProvider } from './form-accounts.service';
import { Types } from '../../models/types';

@Component({
	selector: 'page-form-accounts',
	templateUrl: 'form-accounts.html',
})
export class FormAccountsPage {

	clienteId = '';
	cliente;
	cuenta;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _formAccounts: FormAccountsProvider
	) {

		this.cuenta = {
			CustomerID: null,
			capital: null,
			fecha: _formAccounts.getDate(),
			cuotaDiaria: null,
			interes: null,
			Type: Types.TYPE_ACCOUNT
		};
	}

	get capital() {
		return +this.cuenta.capital;
	}
	set capital(value) {
		this.cuenta.capital = +value;
	}

	get cuotaDiaria() {
		return +this.cuenta.cuotaDiaria;
	}
	set cuotaDiaria(value) {
		this.cuenta.cuotaDiaria = +value;
	}

	get interes() {
		return +this.cuenta.interes;
	}
	set interes(value) {
		this.cuenta.interes = +value;
	}

	ionViewWillEnter() {
		this.clienteId = this.navParams.get('customerId');
		this.cuenta.CustomerID = this.clienteId;

		if (!!this.navParams.get('pendiente')) {
			this.cuenta.capital = +this.navParams.get('pendiente');
		}

		this.obtenerCuenta();
		this.obtenerCliente();
	}

	async save() {
		await this._formAccounts.guardarCuenta(this.cuenta);

		// Si la cuenta se crea para un cliente pendiente
		// se elimina la referencia del cliente
		await this.deletePendiente();

		this.navCtrl.pop();
	}

	async deletePendiente() {
		if (!!this.navParams.get('pendiente')) {
			this.cliente.pendiente = 0;
			return this._formAccounts.save(this.cliente);
		}
	}

	async obtenerCuenta() {
		if (!!this.navParams.get('accountId')) {
			this.cuenta = await this._formAccounts.obtenerCuenta(this.navParams.get('accountId'));
		}
	}

	obtenerCliente() {
		this._formAccounts.obtenerCliente(this.navParams.get('customerId')).then(
			cliente => this.cliente = cliente
		);
	}

}
