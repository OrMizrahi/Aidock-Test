import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COUNTRIES_IDS } from 'src/app/consts';
import { FilterModel } from 'src/app/models/filter-model';
import { FlightModel } from 'src/app/models/flight-model';
import { FlightService } from 'src/app/services/flight-service';

@Component({
	selector: 'app-flight-search',
	templateUrl: './flight-search.component.html',
	styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
	// Necessary variable declarations which will be used in html
	filter: FilterModel;
	flightArr: Array<Array<FlightModel>> = [];
	countries: Array<string> = Object.keys(COUNTRIES_IDS);
	// Using constructor, call the FlightService.
	constructor(private _flightService: FlightService) {}
	ngOnInit() {
		// Initializing values in flight model
		this.resetFilter();
	}

	// This function is called from html which in turn calls the functions in our Flight service.
	searchFlights() {
		// Service function called to add person details to array
		this.flightArr = this._flightService.getFlightDetails(this.filter);
	}

	resetFilter() {
		this.filter = {
			priceRange: [1000, 7500],
			minDate: null,
			maxDate: null,
			origin: '',
			destination: '',
			numOfConnections: null,
		};
	}

	//if origin or destination are filled, the other one must be filled as well
	validateForm() {
		if (
			(this.filter.origin && !this.filter.destination) ||
			(!this.filter.origin && this.filter.destination) ||
			this.sameOriginAndDest()
		) {
			return false;
		}
		return true;
	}

	sameOriginAndDest() {
		if (
			this.filter.origin &&
			this.filter.destination &&
			this.filter.origin === this.filter.destination
		) {
			return true;
		}
		return false;
	}

	noResults() {
		// Conditions to check whether or not to display results
		return this.flightArr.length === 0;
	}

	switchOriginAndDest() {
		const temp = this.filter.destination;
		this.filter.destination = this.filter.origin;
		this.filter.origin = temp;
	}

	//another filter is called each time the pice slider changes, for better user experience
	onChange() {
		this.searchFlights();
	}
	@ViewChild('destCity') destCitySelect: ElementRef;
	focusDestCity($event) {
		this.destCitySelect.nativeElement.focus();
	}
	@ViewChild('fromDate') fromDatePicker: ElementRef;
	focusFromDate($event) {
		this.fromDatePicker.nativeElement.focus();
	}
	@ViewChild('toDate') toDatePicker: ElementRef;
	focusToDate($event) {
		this.toDatePicker.nativeElement.focus();
	}
	@ViewChild('numOfConnections') numOfConnectionsInput: ElementRef;
	focusToNumOfConnections($event) {
		this.numOfConnectionsInput.nativeElement.focus();
	}
}
