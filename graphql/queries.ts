/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      createdAt
      semesters {
        items {
          id
          userId
          name
          createdAt
          gpaScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        createdAt
        semesters {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSemester = /* GraphQL */ `
  query GetSemester($id: ID!) {
    getSemester(id: $id) {
      id
      userId
      name
      createdAt
      gpaScale
      classes {
        items {
          id
          userId
          semesterId
          name
          createdAt
          gradingScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listSemesters = /* GraphQL */ `
  query ListSemesters(
    $filter: ModelSemesterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSemesters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        createdAt
        gpaScale
        classes {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      userId
      semesterId
      name
      createdAt
      gradingScale
      sections {
        items {
          id
          userId
          classId
          name
          createdAt
          gradeScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listClasss = /* GraphQL */ `
  query ListClasss(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        semesterId
        name
        createdAt
        gradingScale
        sections {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      userId
      classId
      name
      createdAt
      gradeScale
      assignments {
        items {
          id
          userId
          sectionId
          name
          createdAt
          gainedPoints
          possiblePoints
          completed
          dueDate
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        classId
        name
        createdAt
        gradeScale
        assignments {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssignment = /* GraphQL */ `
  query GetAssignment($id: ID!) {
    getAssignment(id: $id) {
      id
      userId
      sectionId
      name
      createdAt
      gainedPoints
      possiblePoints
      completed
      dueDate
      updatedAt
    }
  }
`;
export const listAssignments = /* GraphQL */ `
  query ListAssignments(
    $filter: ModelAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        sectionId
        name
        createdAt
        gainedPoints
        possiblePoints
        completed
        dueDate
        updatedAt
      }
      nextToken
    }
  }
`;
