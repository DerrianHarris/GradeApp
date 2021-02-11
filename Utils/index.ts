import { API, graphqlOperation } from 'aws-amplify'
import { getClass, getSection, getSemester } from '../graphql/queries'
import { Class, Assignment, Section, Semester } from '../types'

export const CalcGpa = async (id: string): number => {
  let gpa = 0
  let totalCredit = 0
  const data = await getData(id, getSemester)
  const semeseterData = data.data.getSemester
  if (
    semeseterData.classes.items == undefined ||
    semeseterData.classes.items.length <= 0
  ) {
    return 0
  }

  for (var val of semeseterData.classes.items) {
    const classGrade = await CalClassGrade(val.id)
    gpa += getGpaNum(classGrade, val.gradingScale)
    totalCredit += val.credit
  }
  if (totalCredit > 0) {
    gpa /= totalCredit
  }

  return gpa
}

const getGpaNum = (grade: number, gradeScale: [number]): number => {
  const gradeStr = GradeScaleNameFromGrade(grade, gradeScale)

  if (gradeStr.includes('A')) {
    return 4
  } else if (gradeStr.includes('B')) {
    return 3
  } else if (gradeStr.includes('C')) {
    return 2
  } else if (gradeStr.includes('D')) {
    return 1
  } else {
    return 0
  }
}

export const CalClassGrade = async (id: string): number => {
  let classGrade = 0
  const data = await getData(id, getClass)
  const classData = data.data.getClass

  if (
    classData.sections.items == undefined ||
    classData.sections.items.length <= 0
  ) {
    return 0
  }
  for (let val of classData.sections.items) {
    const sectionGrade = await CalcSectionGrade(val.id)
    classGrade += sectionGrade * val.gradeScale
  }

  classGrade /= classData.sections.items.length
  return classGrade
}

export const CalcSectionGrade = async (id: string): number => {
  let pointsGained = 0
  let pointsPossible = 0

  const data = await getData(id, getSection)
  const section = data.data.getSection
  if (
    section.assignments.items == undefined ||
    section.assignments.items.length <= 0
  ) {
    return 0
  }

  for (let val of section.assignments.items) {
    pointsGained += val.gainedPoints
    pointsPossible += val.possiblePoints
  }
  return (pointsGained / pointsPossible) * 100
}

export const CalcAssignmentGrade = (id: string): number => {
  return 0
}

export const getData = async (id: string, fetchSingleDataOp: string) => {
  const data = await API.graphql(graphqlOperation(fetchSingleDataOp, { id }))
  return data
}

export const gradeScaleName = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'D-',
  'F',
]

const GradeScaleNameFromGrade = (
  grade: number,
  gradeScale: [number],
): string => {
  let gradeStr = ''
  let set = false
  gradeScale.forEach((value, index) => {
    console.log(grade)
    console.log(value)
    console.log(gradeScaleName[index])
    if (grade >= value && !set) {
      gradeStr = gradeScaleName[index]
      set = true
    }
  })

  return gradeStr
}
