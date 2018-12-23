import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";

@Injectable()
export class FormCustomerService extends PouchdbProvider{

	constructor() {
		super();
	}

	async guardarCliente(cliente) {
		if (cliente._id) {
			return this.db.put(cliente);
		} else {
			return this.db.post(cliente);
		}
	}

	obtenerCliente(customerId) {
		return this.db.get(customerId);
	}

}