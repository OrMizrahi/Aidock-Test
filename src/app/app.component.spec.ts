import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let fixture: AppComponent;

	beforeEach(() => {
		fixture = new AppComponent();
	});

	describe('Setup Component', () => {
		it('should be initialized', () => {
			expect(fixture.title).toEqual('aidock-test');
		});
	});
});
