import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { AccountDetailPage } from '../pages/account-detail/account-detail';
import { AccountsPage } from '../pages/accounts/accounts';
import { FormAccountsPage } from '../pages/form-accounts/form-accounts';
import { FormCustomerPage } from '../pages/form-customer/form-customer';
import { FormGroupsPage } from '../pages/form-groups/form-groups';
import { FormPaymentPage } from '../pages/form-payment/form-payment';
import { GroupPage } from '../pages/group/group';
import { GroupsPage } from '../pages/groups/groups';
import { HomePage } from '../pages/home/home';
import { PaymentsPage } from '../pages/payments/payments';
import { WaitingCustomersPage } from '../pages/waiting-customers/waiting-customers';
import { PouchdbProvider } from '../providers/pouchdb/pouchdb';
import { AccountDetailProvider } from '../pages/account-detail/account-detail.service';
import { AccountsProvider } from '../pages/accounts/accounts.service';
import { FormAccountsProvider } from '../pages/form-accounts/form-accounts.service';
import { FormCustomerService } from '../pages/form-customer/form-customer.service';
import { PaymentsProvider } from '../pages/payments/payments.service';
import { HomeProvider } from '../pages/home/home.service';
import { WaitingCustomerService } from '../pages/waiting-customers/waiting-customer.service';
import { GroupsService } from '../pages/form-groups/groups.service';
import { CustomerListProvider } from '../components/customer-list/customer-list.service';
import { GroupInfoService } from '../pages/group/group.service';
import { GroupCustomerAddService } from '../pages/group-customers-add/group-customer-add.service';
import { GroupCustomersAddPage } from '../pages/group-customers-add/group-customers-add';

@NgModule({
	declarations: [
		MyApp,
		AccountDetailPage,
		AccountsPage,
		FormAccountsPage,
		FormCustomerPage,
		FormGroupsPage,
		FormPaymentPage,
		GroupPage,
		GroupsPage,
		HomePage,
		PaymentsPage,
		WaitingCustomersPage,
		GroupCustomersAddPage
	],
	entryComponents: [
		AccountDetailPage,
		AccountsPage,
		FormAccountsPage,
		FormCustomerPage,
		FormGroupsPage,
		FormPaymentPage,
		GroupPage,
		GroupsPage,
		HomePage,
		PaymentsPage,
		WaitingCustomersPage,
		GroupCustomersAddPage
	],
	imports: [
		BrowserModule,
		ComponentsModule,
		IonicModule.forRoot(MyApp, {
			mode: 'ios',
		})
	],
	bootstrap: [IonicApp],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		PouchdbProvider,
		AccountDetailProvider,
		AccountsProvider,
		FormAccountsProvider,
		FormCustomerService,
		PaymentsProvider,
		HomeProvider,
		WaitingCustomerService,
		GroupsService,
		CustomerListProvider,
		GroupInfoService,
		GroupCustomerAddService
	]
})
export class AppModule { }
