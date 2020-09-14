import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight-service';
import { FilterModel } from '../models/filter-model';
import { FlightModel } from '../models/flight-model';

@Component({
	selector: 'app-flight-search',
	templateUrl: './flight-search.component.html',
	styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
	// Necessary variable declarations which will be used in html
	filter: FilterModel;
	flightArr: Array<Array<FlightModel>> = [];

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
			priceRange: [500, 5000],
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
			(!this.filter.origin && this.filter.destination)
		) {
			return false;
		}
		return true;
	}

	noResults() {
		// Conditions to check whether or not to display results
		return this.flightArr.length === 0;
	}

	//another filter is called each time the pice slider changes, for better user experience
	onChange($event) {
		this.searchFlights();
	}
}
