import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Types } from "../../models/types";

@Injectable()
export class GroupsService extends PouchdbProvider {


	constructor() {
		super();
	}

	guardar(grupo) {
		return this.save(grupo);
	}

	async obtenerGrupos() {
		let result = await this.db.find({
			selector: {
				Type: Types.TYPE_GROUP
			}
		});
		let grupos = this._.orderBy(result.docs, ['nombre'], ['asc']);
		return grupos;
	}

	obtenerGrupo(groupId) {
		return this.db.get(groupId);
	}

}