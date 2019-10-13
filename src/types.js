/* @flow */

export type TAction = {
	type: string,
	payload: any,
	message?: string,
	error?: any,
}

export type TPosition = {
	latitude: number,
	longitude: number,
}

export type TCurrentPosition = {
	isSet: boolean,
	latitude: number,
	longitude: number,
}

export type TStoredPosition = {
	stored: boolean,
	latitude: number,
	longitude: number,
}
