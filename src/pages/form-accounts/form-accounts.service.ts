import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";

@Injectable()
export class FormAccountsProvider extends PouchdbProvider {

	constructor() {
		super();
	}

	async guardarCuenta(cuenta) {
		console.log('guardar cuenta:', cuenta);
		return this.save(cuenta);
	}

	async obtenerCuenta(cuentaId) {
		let result = await this.db.get(cuentaId);
		return result;
	}

	async obtenerCliente(customerId) {
		let result = await this.db.get(customerId);
		return result;
	}

}