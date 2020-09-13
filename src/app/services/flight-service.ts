import { Injectable } from '@angular/core';
import moment from 'moment';
import { FlightModel } from '../models/flight-model';
import { FilterModel } from '../models/filter-model';

@Injectable()
export class FlightService {
	private allFlights: FlightModel[] = [
		{
			id: 1,
			origin: 'Israel',
			destination: 'France',
			deptDate: new Date('08 May, 2018'),
			price: 2001,
			ids: [],
			length: 3.5,
		},

		{
			id: 3,
			origin: 'Russia',
			destination: 'Sweden',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			ids: [],
			length: 2,
		},

		{
			id: 4,
			origin: 'France',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			ids: [],
			length: 2,
		},
		{
			id: 5,
			origin: 'Germany',
			destination: 'Russia',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			ids: [],
			length: 1.5,
		},
		{
			id: 2,
			origin: 'Israel',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			ids: [],
			length: 4.5,
		},
		{
			id: 7,
			origin: 'Israel',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 1700,
			ids: [],
			length: 6,
		},
	];

	constructor() {}

	getFlightDetails(filter: FilterModel): Array<FlightModel> {
		let {
			priceRange,
			minDate,
			maxDate,
			numOfConnections,
			origin,
			destination,
		} = filter;
		let filteredFlights = [];

		let connectedFlights = this.getConnectedFlights(
			origin,
			destination,
			null,
			new Array<FlightModel>()
		);

		if (!connectedFlights) {
			return [];
		}

		let directFlights = this.allFlights.filter(
			(flight) =>
				(origin ? flight.origin === origin : true) &&
				(destination ? flight.destination === destination : true)
		);
		directFlights.forEach((f) =>
			f.ids.length === 0 ? f.ids.push(f.id) : null
		);

		connectedFlights = connectedFlights.filter((f) =>
			directFlights ? !directFlights.includes(f) : true
		);
		if (connectedFlights.length > 0) {
			connectedFlights[0].ids = connectedFlights.map((f) => f.id);
		}

		filteredFlights = connectedFlights
			? [...connectedFlights, ...directFlights]
			: directFlights;

		return filteredFlights.filter((flight: FlightModel) => {
			if (flight.ids.length === 0) {
				return false;
			}

			let fromDate = minDate ? moment(minDate) : null;
			let toDate = maxDate ? moment(maxDate) : null;
			let actualDate = moment(flight.deptDate);
			let price =
				flight.ids.length === 1
					? flight.price
					: this.allFlights
							.filter((f) => flight.ids.includes(f.id))
							.reduce((a, b) => a + b.price, 0);

			return (
				(priceRange
					? priceRange[0] <= price && priceRange[1] >= price
					: true) &&
				(fromDate ? fromDate.isSameOrBefore(actualDate) : true) &&
				(toDate ? toDate.isSameOrAfter(actualDate) : true) &&
				(numOfConnections != null
					? flight.ids.length - 1 === numOfConnections
					: true)
			);
		});
	}

	getConnectedFlights(
		origin: string,
		destination: string,
		newDest: string,
		connections: Array<FlightModel>
	): Array<FlightModel> {
		if (origin === destination) {
			return connections;
		}
		let newstartFlights = newDest
			? this.allFlights.filter((f) => f.origin === newDest)
			: this.allFlights.filter((f) => f.origin === origin);

		for (const flight of newstartFlights) {
			connections.push(flight);

			return this.getConnectedFlights(
				flight.destination,
				destination,
				flight.destination,
				connections
			);
		}
	}

	getAllFlights(): Array<FlightModel> {
		return this.allFlights;
	}
}
