import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import _ from 'lodash';

@Injectable()
export class PouchdbProvider {
	
	db;
	isReady = false;
	_;
	options = {
		auto_compaction: true,
		revs_limit: 1
	};

	constructor() {
		this._ = _;
		PouchDB.plugin(PouchDBFind);
		this.db = new PouchDB('cygnus2_5', this.options);
		this.isReady = true;
	}

	createIndex(options) {
		return this.db.createIndex(options);
	}

	getDb(): Promise<any> {
		return new Promise(async (resolve) => {
			resolve(this.db);
		});
	}

	getTimeStamp() {
		const fecha = new Date();
		return Math.round( fecha.getTime() / 1000 );
	}

	getDate() {
		const f = new Date();
		let mes: any = f.getMonth() + 1;
		let dia: any = f.getDate();

		mes = mes < 10 ? ('0' + mes) : mes;
		dia = dia < 10 ? ('0' + dia) : dia;

		const fecha = `${f.getFullYear()}-${mes}-${dia}`;
		console.log('fecha: ', fecha);
		return fecha;
	}

	timestampToStringDate(t) {
		const f = new Date(t * 1000);
		let mes: any = f.getMonth() + 1;
		let dia: any = f.getDate();

		mes = mes < 10 ? ('0' + mes) : mes;
		dia = dia < 10 ? ('0' + dia) : dia;

		return (`${f.getFullYear()}-${mes}-${dia}`);
	}

	dateToTimestamp(fecha) {
		return Math.round( new Date(fecha).getTime() / 1000 );
	}

	async save(document: any) {
		document.updated_at = this.getTimeStamp();
		if (document._id) {
			return this.db.put( document );
		}
		else {
			document.created_at = this.getTimeStamp();
			return this.db.post( document );
		}
	}

	find(options) {
		return this.db.find(options);
	}

}
