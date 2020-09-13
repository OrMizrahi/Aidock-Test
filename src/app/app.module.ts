import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightService } from './services/flight-service';
import { DatePipe } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';

@NgModule({
	declarations: [AppComponent	,FlightSearchComponent],
	imports: [
		BrowserModule,
		MaterialModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		NouisliderModule,
		MaterialModule,
		BrowserAnimationsModule,
	],
	providers: [FlightService, DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
