export type RootStackParamList = {
	Home: undefined;
	Semesters: any;
	Class: undefined;
	Section: undefined;
	Assignments: undefined;
	NotFound: undefined;
};

export type User = {
	id: string;
	name: string;
};

export type Semester = {
	id: string;
	userId: string;
	name: string;
	gpaScale: number;
	classes: [Class];
};

export type Class = {
	id: string;
	semesterId: string;
	name: string;
	gradingScale: [number];
	credit: number;
	section: [Section];
};

export type Section = {
	id: string;
	classId: string;
	name: string;
	gradeScale: number;
	assignments: [Assignment];
};

export type Assignment = {
	id: string;
	sectionId: string;
	name: string;
	gainedPoints: number;
	possiblePoints: number;
	grade: number;
	completed: boolean;
	dueDate: number;
};
