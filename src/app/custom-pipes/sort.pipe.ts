import { Pipe, PipeTransform } from '@angular/core';
import { FlightModel } from '../models/flight-model';
import { FlightService } from '../services/flight-service';

@Pipe({
	name: 'sort',
	pure: false,
})
export class SortPipe implements PipeTransform {
	constructor(private _flightService: FlightService) {}

	transform(
		value: Array<Array<FlightModel>>,
		sortBy: string
	): Array<Array<FlightModel>> {
		switch (sortBy) {
			case '':
				return value;
			case 'ascTime':
				return this._flightService.sortByTime(value, 'asc');
			case 'descTime':
				return this._flightService.sortByTime(value, 'desc');
			case 'ascConnections':
				return this._flightService.sortByConnections(value, 'asc');
			case 'descConnections':
				return this._flightService.sortByConnections(value, 'desc');
			case 'ascPrice':
				return this._flightService.sortByPrice(value, 'asc');
			case 'descPrice':
				return this._flightService.sortByPrice(value, 'desc');
			default:
				break;
		}
	}
}
