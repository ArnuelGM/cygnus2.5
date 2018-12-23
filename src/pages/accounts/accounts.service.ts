import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Types } from "../../models/types";

@Injectable()
export class AccountsProvider extends PouchdbProvider {

	constructor() {
		super();
	}
	
	async obtenerCliente(customerId: string) {
		let result = await this.db.get(customerId);
		return result;
	}
	
	async obtenerCuentas(customerId) {
		let result = await this.db.find({
			selector: {
				Type: {
					$eq: Types.TYPE_ACCOUNT
				},
				CustomerID: {
					$eq: customerId
				}
			}
		});
		const res = this._.orderBy(result.docs, ['capital', 'fecha'], ['desc', 'desc']);
		return res;
	}

}