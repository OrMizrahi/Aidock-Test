import { FlightSearchResultsComponent } from './flight-search-results.component';

describe('FlightSearchResultsComponent', () => {
	let fixture: FlightSearchResultsComponent;
	let flighServiceMock: any;

	beforeEach(() => {
		flighServiceMock = {
			calcPrice: jest.fn(),
			calcTime: jest.fn(),
		};
		fixture = new FlightSearchResultsComponent(flighServiceMock);
	});

	describe('Setup Component', () => {
		describe('ngOnInit', () => {
			it('should set sortBy to an empty string', () => {
				fixture.ngOnInit();
				expect(fixture.sortBy).toEqual('');
			});
		});
	});

	describe('Calc Price method', () => {
		it('should call this.flightService.calcPrice with same parameters', () => {
			const connFlight = [];
			fixture.calcPrice(connFlight);
			expect(flighServiceMock.calcPrice).toBeCalledWith(connFlight);
		});
	});

	describe('Calc Time method', () => {
		it('should call this.flightService.calcTime with same parameters', () => {
			const connFlight = [];
			fixture.calcTime(connFlight);
			expect(flighServiceMock.calcTime).toBeCalledWith(connFlight);
		});
	});
});
