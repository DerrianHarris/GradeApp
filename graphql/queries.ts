/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
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
      createdAt
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
        semesters {
          nextToken
        }
        createdAt
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
        updatedAt
      }
      nextToken
    }
  }
`;
