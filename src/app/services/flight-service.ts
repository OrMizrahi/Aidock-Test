import { Injectable } from '@angular/core';
import { FlightModel } from '../models/flight-model';
import { DatePipe } from '@angular/common';
import { FilterModel } from '../models/filter-model';

@Injectable()
export class FlightService {
	allFlights: FlightModel[] = [
		{
			id: 3,
			origin: 'HYD',
			destination: 'BLR',
			deptDate: new Date('08 May, 2018'),

			price: 2000,
		},
		{
			id: 3,
			origin: 'HYD',
			destination: 'BLR',
			deptDate: new Date('08 May, 2018'),

			price: 2000,
		},
		{
			id: 3,
			origin: 'HYD',
			destination: 'BLR',
			deptDate: new Date('08 May, 2018'),

			price: 2000,
		},

		{
			id: 3,
			origin: 'HYD',
			destination: 'BLR',
			deptDate: new Date('08 May, 2018'),

			price: 2000,
		},
	];

	flightResults: Array<FlightModel> = [];

	constructor(public datepipe: DatePipe) {}

	getFlightDetails(filter: FilterModel): Array<FlightModel> {
		return this.allFlights;
	}
}
