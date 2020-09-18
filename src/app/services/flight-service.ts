import { Injectable } from '@angular/core';
import moment from 'moment';
import { COUNTRIES_IDS } from '../consts';
import { FilterModel } from '../models/filter-model';
import { FlightModel } from '../models/flight-model';

@Injectable()
export class FlightService {
	allFlights: FlightModel[] = [
		{
			id: 5,
			origin: 'Germany',
			destination: 'Russia',
			deptDate: new Date('22 November, 2020'),
			price: 2000,
			length: 1.5,
		},
		{
			id: 1,
			origin: 'Israel',
			destination: 'France',
			deptDate: new Date('22 November, 2020'),
			price: 2001,
			length: 3.5,
		},

		{
			id: 3,
			origin: 'Russia',
			destination: 'Sweden',
			deptDate: new Date('22 November, 2020'),
			price: 2000,
			length: 2,
		},
		{
			id: 2,
			origin: 'Israel',
			destination: 'Germany',
			deptDate: new Date('22 November, 2020'),
			price: 2000,
			length: 4.5,
		},
		{
			id: 4,
			origin: 'France',
			destination: 'Germany',
			deptDate: new Date('22 November, 2020'),
			price: 2000,
			length: 2,
		},
		{
			id: 7,
			origin: 'Israel',
			destination: 'Germany',
			deptDate: new Date('22 November, 2020'),
			price: 1700,
			length: 6,
		},
	];
	adjList: Array<Array<{ dest: number; fID: number }>>;
	result: Array<string>;
	countriesLength: number;

	constructor() {
		this.countriesLength = Object.keys(COUNTRIES_IDS).length;

		this.adjList = new Array<Array<{ dest: number; fID: number }>>(
			this.countriesLength
		);
		for (let i = 0; i < this.countriesLength; i++) {
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

		if (origin && destination) {
			//sets the flights into result
			this.setResultsFlights(COUNTRIES_IDS[origin], COUNTRIES_IDS[destination]);
		} else {
			this.result = this.allFlights.map((f) => f.id.toString());
		}

		if (this.result.length === 0) {
			console.log('no flights');
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

	sortByConnections(
		value: FlightModel[][],
		sortOption: string
	): FlightModel[][] {
		return value.sort((f1, f2) =>
			sortOption === 'asc' ? f1.length - f2.length : f2.length - f1.length
		);
	}
	sortByTime(value: FlightModel[][], sortOption: string): FlightModel[][] {
		return value.sort((f1, f2) => {
			let f1Time = this.calcTime(f1);
			let f2Time = this.calcTime(f2);

			return sortOption === 'asc' ? f1Time - f2Time : f2Time - f1Time;
		});
	}

	sortByPrice(value: FlightModel[][], sortOption: string): FlightModel[][] {
		return value.sort((f1, f2) => {
			let f1Price = this.calcPrice(f1);
			let f2Price = this.calcPrice(f2);

			return sortOption === 'asc' ? f1Price - f2Price : f2Price - f1Price;
		});
	}

	calcPrice(connFlights: FlightModel[]): number {
		return connFlights.reduce((acc, f) => acc + f.price, 0);
	}
	calcTime(connFlights: FlightModel[]): number {
		return connFlights.reduce((acc, f) => acc + f.length, 0);
	}

	setResultsFlights(origin: number, destination: number) {
		let isVisited = new Array<boolean>(this.countriesLength);
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
