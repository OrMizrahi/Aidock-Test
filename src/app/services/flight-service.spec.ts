import { FlightService } from './flight-service';
import { COUNTRIES_IDS } from '../consts';
import moment from 'moment';

describe('FlightService', () => {
	let fixture: FlightService;

	const connFlight = [
		{
			id: 2,
			origin: 'Israel',
			destination: 'France',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			length: 4.5,
		},
		{
			id: 2,
			origin: 'France',
			destination: 'Germany',
			deptDate: new Date('08 May, 2018'),
			price: 2000,
			length: 4.5,
		},
	];

	const dummyData = [
		[
			{
				id: 2,
				origin: 'Israel',
				destination: 'Germany',
				deptDate: new Date('08 May, 2018'),
				price: 2000,
				length: 10,
			},
		],
		connFlight,
	];

	beforeEach(() => {
		fixture = new FlightService();
	});

	describe('Constructor ', () => {
		it('should initialize correctly', () => {
			expect(fixture.countriesLength).toBe(Object.keys(COUNTRIES_IDS).length);
			expect(fixture.adjList).toHaveLength(fixture.countriesLength);
			expect(fixture.result).not.toBeNull();
		});
	});

	describe('SortByConnections method', () => {
		it('should sort correctly by asc', () => {
			fixture.sortByConnections(dummyData, 'asc');
			expect(dummyData[0]).toEqual([
				{
					id: 2,
					origin: 'Israel',
					destination: 'Germany',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 10,
				},
			]);
		});
		it('should sort correctly by desc', () => {
			fixture.sortByConnections(dummyData, 'desc');
			expect(dummyData[0]).toEqual([
				{
					id: 2,
					origin: 'Israel',
					destination: 'France',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 4.5,
				},
				{
					id: 2,
					origin: 'France',
					destination: 'Germany',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 4.5,
				},
			]);
		});
	});

	describe('SortByTime method', () => {
		it('should sort correctly by asc', () => {
			fixture.sortByTime(dummyData, 'asc');
			expect(dummyData[0]).toEqual([
				{
					id: 2,
					origin: 'Israel',
					destination: 'France',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 4.5,
				},
				{
					id: 2,
					origin: 'France',
					destination: 'Germany',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 4.5,
				},
			]);
		});
		it('should sort correctly by desc', () => {
			fixture.sortByTime(dummyData, 'desc');
			expect(dummyData[0]).toEqual([
				{
					id: 2,
					origin: 'Israel',
					destination: 'Germany',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 10,
				},
			]);
		});
	});

	describe('SortByPrice method', () => {
		it('should sort correctly by asc', () => {
			fixture.sortByPrice(dummyData, 'asc');
			expect(dummyData[0]).toEqual([
				{
					id: 2,
					origin: 'Israel',
					destination: 'Germany',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 10,
				},
			]);
		});
		it('should sort correctly by price', () => {
			fixture.sortByPrice(dummyData, 'desc');
			expect(dummyData[0]).toEqual([
				{
					id: 2,
					origin: 'Israel',
					destination: 'France',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 4.5,
				},
				{
					id: 2,
					origin: 'France',
					destination: 'Germany',
					deptDate: new Date('08 May, 2018'),
					price: 2000,
					length: 4.5,
				},
			]);
		});
	});

	describe('Calc Price Method', () => {
		it('should calculate price correctly', () => {
			const result = fixture.calcPrice(connFlight);
			expect(result).toBe(connFlight.reduce((acc, f) => acc + f.price, 0));
		});
	});

	describe('Calc Time Method', () => {
		it('should calculate time correctly', () => {
			const result = fixture.calcTime(connFlight);
			expect(result).toBe(connFlight.reduce((acc, f) => acc + f.length, 0));
		});
	});

	describe('Set Results Flights Method', () => {
		it('should set results correctly (with flights)', () => {
			fixture.setResultsFlights(
				COUNTRIES_IDS['Israel'],
				COUNTRIES_IDS['Germany']
			);
			//each string represents a direct/connected flight/s ids
			expect(fixture.result).toEqual(['1 4', '2', '7']);
		});
	});

	describe('Get Flights Details Method', () => {
		it('should return flights with correct price range', () => {
			const filter = {
				priceRange: [2001, 3000],
				maxDate: null,
				minDate: null,
				numOfConnections: null,
				origin: '',
				destination: '',
			};
			const results = fixture.getFlightDetails(filter);
			let totalPrice = 0;
			for (const result of results) {
				for (const flight of result) {
					totalPrice += flight.price;
				}
				expect(totalPrice).toBeLessThanOrEqual(filter.priceRange[1]);
				expect(totalPrice).toBeGreaterThanOrEqual(filter.priceRange[0]);
				totalPrice = 0;
			}
		});
		it('should return flights with correct min date', () => {
			const filter = {
				priceRange: [1, 99999],
				maxDate: null,
				minDate: new Date('11 October, 2020'),
				numOfConnections: null,
				origin: '',
				destination: '',
			};
			const results = fixture.getFlightDetails(filter);

			for (const result of results) {
				for (const flight of result) {
					expect(
						moment(flight.deptDate).isSameOrAfter(moment(filter.minDate))
					).toBeTruthy();
				}
			}
		});
		it('should return flights with correct max date', () => {
			const filter = {
				priceRange: [1, 99999],
				maxDate: new Date('11 October, 2020'),
				minDate: null,
				numOfConnections: null,
				origin: '',
				destination: '',
			};
			const results = fixture.getFlightDetails(filter);

			for (const result of results) {
				for (const flight of result) {
					expect(
						moment(flight.deptDate).isSameOrBefore(moment(filter.maxDate))
					).toBeTruthy();
				}
			}
		});

		it('should return flights with correct number of connections', () => {
			const filter = {
				priceRange: [1, 99999],
				maxDate: null,
				minDate: null,
				numOfConnections: 2,
				origin: '',
				destination: '',
			};
			const results = fixture.getFlightDetails(filter);

			for (const result of results) {
				expect(result).toHaveLength(filter.numOfConnections);
			}
		});

		it('should return flights with correct origin and destination', () => {
			const filter = {
				priceRange: [1, 99999],
				maxDate: null,
				minDate: null,
				numOfConnections: null,
				origin: 'Israel',
				destination: 'Germany',
			};
			const results = fixture.getFlightDetails(filter);

			for (const result of results) {
				expect(result[0].origin).toEqual(filter.origin);
				expect(result[result.length - 1].destination).toEqual(
					filter.destination
				);
			}
		});

		it('should return all flights if there are not filters', () => {
			const result = fixture.getFlightDetails({
				priceRange: [1, 99999],
				maxDate: null,
				minDate: null,
				numOfConnections: null,
				origin: '',
				destination: '',
			});

			expect(result).toHaveLength(fixture.allFlights.length);
		});
	});
});
