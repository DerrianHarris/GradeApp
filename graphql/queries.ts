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
        updatedAt
      }
      nextToken
    }
  }
`;
