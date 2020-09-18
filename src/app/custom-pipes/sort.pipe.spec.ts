import { SortPipe } from './sort.pipe';

describe('TitleCasePipe', () => {
	// This pipe is a pure, stateless function so no need for BeforeEach
	let fixture: SortPipe;
	let flighServiceMock: any;
	let dummyValue = [];

	beforeEach(() => {
		flighServiceMock = {
			sortByTime: jest.fn(),
			sortByConnections: jest.fn(),
			sortByPrice: jest.fn(),
		};
		fixture = new SortPipe(flighServiceMock);
	});

	describe('Transform Method', () => {
		it('should return value if sortBy is an empty string', () => {
			expect(fixture.transform(dummyValue, '')).toBe(dummyValue);
		});
		it('should call this.flightService.sortByTime correctly with asc', () => {
			fixture.transform(dummyValue, 'ascTime');
			expect(flighServiceMock.sortByTime).toHaveBeenCalledWith(
				dummyValue,
				'asc'
			);
		});
		it('should call this.flightService.sortByTime correctly with desc', () => {
			fixture.transform(dummyValue, 'descTime');
			expect(flighServiceMock.sortByTime).toHaveBeenCalledWith(
				dummyValue,
				'desc'
			);
		});
		it('should call this.flightService.sortByPrice correctly with asc', () => {
			fixture.transform(dummyValue, 'ascPrice');
			expect(flighServiceMock.sortByPrice).toHaveBeenCalledWith(
				dummyValue,
				'asc'
			);
		});
		it('should call this.flightService.sortByPrice correctly with desc', () => {
			fixture.transform(dummyValue, 'descPrice');
			expect(flighServiceMock.sortByPrice).toHaveBeenCalledWith(
				dummyValue,
				'desc'
			);
		});
		it('should call this.flightService.sortByConnections correctly with asc', () => {
			fixture.transform(dummyValue, 'ascConnections');
			expect(flighServiceMock.sortByConnections).toHaveBeenCalledWith(
				dummyValue,
				'asc'
			);
		});
		it('should call this.flightService.sortByConnections correctly with desc', () => {
			fixture.transform(dummyValue, 'descConnections');
			expect(flighServiceMock.sortByConnections).toHaveBeenCalledWith(
				dummyValue,
				'desc'
			);
		});
	});
});
