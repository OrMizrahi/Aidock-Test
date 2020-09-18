import { Component, OnInit, Input } from '@angular/core';
import { FlightModel } from 'src/app/models/flight-model';
import { FlightService } from 'src/app/services/flight-service';

@Component({
	selector: 'app-flight-search-results',
	templateUrl: './flight-search-results.component.html',
	styleUrls: ['./flight-search-results.component.css'],
})
export class FlightSearchResultsComponent implements OnInit {
	sortBy: string;
	private fResults: Array<Array<FlightModel>>;
	get flightResults(): Array<Array<FlightModel>> {
		return this.fResults;
	}
	@Input() set flightResults(value: Array<Array<FlightModel>>) {
		this.fResults = value;
	}

	// Using constructor, call the FlightService.
	constructor(private _flightService: FlightService) {}

	calcPrice(connFlights: Array<FlightModel>) {
		return this._flightService.calcPrice(connFlights);
	}
	calcTime(connFlights: Array<FlightModel>) {
		return this._flightService.calcTime(connFlights);
	}

	ngOnInit() {
		this.sortBy = '';
	}
}
