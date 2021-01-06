import { Component } from "react";

export type RootStackParamList = {
	Home: undefined;
	Semesters: any;
	Class: undefined;
	Assignments: undefined;
	NotFound: undefined;
};

export type User = {
	id: string;
	name: string;
};

export type Semester = {
	id: string;
	name: string;
	gpaScale: number;
	classes: [Class];
};

export type Class = {
	id: string;
	name: string;
	gradingScale: [number];
	catogory: [Catogory];
};

export type Catogory = {
	id: string;
	Name: string;
	Scale: number;
	Assignments: [Assignment];
};

export type Assignment = {
	id: string;
	Name: string;
	GainedPoints: number;
	PossiblePoints: number;
	Completed: boolean;
	dueDate: number;
};
