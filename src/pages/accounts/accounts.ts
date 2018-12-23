import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from './accounts.service';
import { PaymentsPage } from '../payments/payments';
import { FormAccountsPage } from '../form-accounts/form-accounts';
import { AccountDetailPage } from '../account-detail/account-detail';

@Component({
	selector: 'page-accounts',
	templateUrl: 'accounts.html',
})
export class AccountsPage {

	allAccounts;
	clienteId = '';
	cliente;
	cuentas;

	// ver cuentas
	estadoCuenta = 'cuentas_activas';

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _accounts: AccountsProvider
	) { }



	ionViewWillEnter() {
		// se obtiene id del cliente para buscar las cuentas asociadas
		this.clienteId = this.navParams.get('customerId');
		console.log('customerAccounts: customer id:', this.clienteId);		

		// obtenemos el cliente
		this._accounts.obtenerCliente(this.clienteId).then((cliente) => this.cliente = cliente);

		// obtenemos las cuentas del cliente
		this.obtenerCuentas();
	}

	agregarCuenta() {
		this.navCtrl.push(FormAccountsPage, { customerId: this.clienteId });
	}

	verDetalleCuenta(accountId) {
		this.navCtrl.push( PaymentsPage , {
			customerId: this.clienteId,
			accountId: accountId
		});
	}

	async obtenerCuentas() {
		try {
			this.allAccounts = await this._accounts.obtenerCuentas(this.clienteId);
			this.mostrarCuentas();
		} catch (e) {
			console.log('error: ', e);
		}
	}

	mostrarCuentas() {
		if (this.estadoCuenta == 'cuentas_activas') {
			this.cuentas = this.allAccounts.filter( (cuenta) => !cuenta.archivada );
		} else {
			this.cuentas = this.allAccounts.filter((cuenta) => cuenta.archivada );
		}
	}

	goAccountDetail(accountId) {
		this.navCtrl.push(AccountDetailPage, {
			customerId: this.clienteId,
			accountId: accountId
		});
	}

}
