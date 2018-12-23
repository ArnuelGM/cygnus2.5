import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MenuDrawerComponent } from './menu-drawer/menu-drawer';
import { MenuTabsComponent } from './menu-tabs/menu-tabs';
import { CustomerListComponent } from './customer-list/customer-list';

@NgModule({
	declarations: [
		MenuDrawerComponent,
		MenuTabsComponent,
    	CustomerListComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		MenuDrawerComponent,
		MenuTabsComponent,
    	CustomerListComponent
	]
})
export class ComponentsModule { }
