import { FlightModel } from 'src/app/models/flight-model';
import { FlightSearchComponent } from './flight-search.component';

describe('FlightSearchComponent', () => {
	let fixture: FlightSearchComponent;
	let flighServiceMock: any;

	beforeEach(() => {
		flighServiceMock = {
			getFlightDetails: jest.fn(),
		};
		fixture = new FlightSearchComponent(flighServiceMock);
	});

	describe('Setup Component', () => {
		describe('ngOnInit', () => {
			it('should call resetFilter without parameters', () => {
				const resetFilterSpy = jest.spyOn(fixture, 'resetFilter');
				fixture.ngOnInit();
				expect(resetFilterSpy).toBeCalledWith();
			});
		});
	});

	describe('Reset Filter Method', () => {
		it('should reset filter correctly', () => {
			fixture.resetFilter();
			expect(fixture.filter).toEqual({
				priceRange: [1000, 7500],
				minDate: null,
				maxDate: null,
				origin: '',
				destination: '',
				numOfConnections: null,
			});
		});
	});

	describe('Validate Form Method', () => {
		describe('Valid Form', () => {
			it('should be valid without origin and destination', () => {
				fixture.filter = {
					origin: '',
					destination: '',
					maxDate: null,
					minDate: null,
					numOfConnections: null,
					priceRange: [],
				};
				const result = fixture.validateForm();
				expect(result).toBeTruthy();
			});
			it('should be valid with origin and destination', () => {
				fixture.filter = {
					origin: 'Israel',
					destination: 'Germany',
					maxDate: null,
					minDate: null,
					numOfConnections: null,
					priceRange: [],
				};
				const result = fixture.validateForm();
				expect(result).toBeTruthy();
			});
		});
		describe('InValid Form', () => {
			it('should not call this.service.getFlightsDetails with invalid input', () => {
				fixture.filter = {
					origin: 'Israel',
					destination: '',
					maxDate: null,
					minDate: null,
					numOfConnections: null,
					priceRange: [],
				};
				const getFlightDetailsMock = jest.spyOn(
					flighServiceMock,
					'getFlightDetails'
				);
				expect(getFlightDetailsMock).not.toHaveBeenCalled();
			});
			it('should be invalid with origin and without destination', () => {
				fixture.filter = {
					origin: 'Israel',
					destination: '',
					maxDate: null,
					minDate: null,
					numOfConnections: null,
					priceRange: [],
				};
				const result = fixture.validateForm();
				expect(result).toBeFalsy();
			});
			it('should be invalid with destination and without origin', () => {
				fixture.filter = {
					origin: '',
					destination: 'Germany',
					maxDate: null,
					minDate: null,
					numOfConnections: null,
					priceRange: [],
				};
				const result = fixture.validateForm();
				expect(result).toBeFalsy();
			});
			it('should be invalid with same origin and destination', () => {
				fixture.filter = {
					origin: 'Germany',
					destination: 'Germany',
					maxDate: null,
					minDate: null,
					numOfConnections: null,
					priceRange: [],
				};
				const result = fixture.validateForm();
				expect(result).toBeFalsy();
			});
		});
	});

	describe('No Results', () => {
		it('should return true if this.flightArr.length === 0', () => {
			fixture.flightArr = [];
			const result = fixture.noResults();
			expect(result).toBeTruthy();
		});
		it('should return false if this.flightArr.length !== 0', () => {
			fixture.flightArr = new Array<Array<FlightModel>>(1);
			const result = fixture.noResults();
			expect(result).toBeFalsy();
		});
	});

	describe('On Change Handler', () => {
		it('should call this.searchFlights without parameters', () => {
			const searchFlightsMock = jest.spyOn(fixture, 'searchFlights');
			fixture.onChange();
			expect(searchFlightsMock).toHaveBeenCalledWith();
		});
	});

	describe('Search Flights Method', () => {
		it('should call this.flightsService.getFlightDetails with this.filter', () => {
			const filter = {
				destination: 'Brazil',
				origin: 'Russia',
				priceRange: [1, 22],
				numOfConnections: 2,
				minDate: null,
				maxDate: null,
			};
			fixture.filter = filter;
			const getFlightDetailsMock = jest.spyOn(
				flighServiceMock,
				'getFlightDetails'
			);
			fixture.searchFlights();
			expect(getFlightDetailsMock).toHaveBeenCalledWith(filter);
		});
	});
});
