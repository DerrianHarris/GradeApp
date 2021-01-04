import { Component } from 'react';

export type RootStackParamList = {
	Home: undefined;
	Semesters: any;
	Class: undefined;
	Assignments: undefined;
	NotFound: undefined;
};

export type Semester = {
	Year: number;
	Name: string;
	Classes: [Class];
};

export type Class = {
	Name: string;
	Assignments: [Assignment];
};

export type Assignment = {
	Name: string;
	grade: number;
	dueDate: number;
};
