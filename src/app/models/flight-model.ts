export interface FlightModel {
	id: number;
	origin: string;
	destination: string;
	deptDate: Date;
	price: number;
	ids: Array<number>;
	length: number;
}

