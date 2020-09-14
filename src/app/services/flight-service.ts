import { Injectable } from '@angular/core';
import moment from 'moment';
import { COUNTRIES_IDS } from '../consts';
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
			length: 3.5,
		},

		{
			id: 3,
			origin: 'Russia',
			destination: 'Sweden',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			length: 2,
		},

		{
			id: 4,
			origin: 'France',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			length: 2,
		},
		{
			id: 5,
			origin: 'Germany',
			destination: 'Russia',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			length: 1.5,
		},
		{
			id: 2,
			origin: 'Israel',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			length: 4.5,
		},
		{
			id: 7,
			origin: 'Israel',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 1700,
			length: 6,
		},
	];
	adjList: Array<Array<{ dest: number; fID: number }>>;
	result: Array<string>;

	constructor() {
		this.adjList = new Array<Array<{ dest: number; fID: number }>>(
			Object.keys(COUNTRIES_IDS).length
		);
		for (let i = 0; i < 5; i++) {
			this.adjList[i] = new Array<{ dest: number; fID: number }>();
		}

		this.allFlights.forEach((flight) => {
			this.adjList[COUNTRIES_IDS[flight.origin]].push({
				dest: COUNTRIES_IDS[flight.destination],
				fID: flight.id,
			});
		});

		this.result = new Array<string>();
	}

	getFlightDetails(filter: FilterModel): Array<Array<FlightModel>> {
		let {
			priceRange,
			minDate,
			maxDate,
			numOfConnections,
			origin,
			destination,
		} = filter;
		let fromDate = minDate ? moment(minDate) : null;
		let toDate = maxDate ? moment(maxDate) : null;

		//reseting resulr before each search
		this.result = new Array<string>();
		//sets the flights into result
		this.setConnectedFlights(COUNTRIES_IDS[origin], COUNTRIES_IDS[destination]);

		if (this.result.length === 0) {
			return [];
		}

		let allFlights: Array<Array<FlightModel>> = new Array<Array<FlightModel>>();
		let temp: Array<FlightModel> = new Array<FlightModel>();

		for (const currFlightsIds of this.result) {
			for (let currFlightId of currFlightsIds.split(' ')) {
				temp.push(this.allFlights.find((f) => f.id === parseInt(currFlightId)));
			}
			allFlights.push(temp);
			temp = new Array<FlightModel>();
		}

		return allFlights.filter((flights) => {
			let totalPrice = flights.reduce((acc, f) => acc + f.price, 0);
			let actualDate = moment(flights[0].deptDate);
			return (
				(priceRange
					? priceRange[0] <= totalPrice && priceRange[1] >= totalPrice
					: true) &&
				(fromDate ? fromDate.isSameOrBefore(actualDate) : true) &&
				(toDate ? toDate.isSameOrAfter(actualDate) : true) &&
				(numOfConnections != null
					? flights.length - 1 === numOfConnections
					: true)
			);
		});
	}

	setConnectedFlights(origin: number, destination: number) {
		let isVisited = new Array<boolean>(5);
		let pathList = new Array<number>();

		this.addAllPathsUtil(origin, destination, isVisited, pathList);
	}
	addAllPathsUtil(
		origin: number,
		destination: number,
		isVisited: boolean[],
		pathList: number[]
	) {
		if (origin === destination) {
			this.result.push(pathList.join(' '));
			return;
		}

		// Mark the current node
		isVisited[origin] = true;

		// Recur for all the vertices
		// adjacent to current vertex
		for (const i of this.adjList[origin]) {
			if (!isVisited[i.dest]) {
				// store current node
				// in path[]
				pathList.push(i.fID);
				this.addAllPathsUtil(i.dest, destination, isVisited, pathList);

				// remove current node
				// in path[]
				pathList.pop();
			}
		}

		// Mark the current node
		isVisited[origin] = false;
	}
}
