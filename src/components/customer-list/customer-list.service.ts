import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";

@Injectable()
export class CustomerListProvider extends PouchdbProvider {

	constructor() {
		super();
	}

}