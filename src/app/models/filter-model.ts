export interface FilterModel {
	priceRange: Array<number>;
	minDate: Date;
	maxDate: Date;
	numOfConnections: number;
	origin: string;
	destination: string;
}
