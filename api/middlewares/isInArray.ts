const isInArray = (array: any, value: string | number | Date) => {
  const dateToBeChecked = new Date(value)
  const dateStringToCheck = `${dateToBeChecked.getDate()}-${dateToBeChecked.getMonth()}-${dateToBeChecked.getFullYear()}`

  const dateSet = new Set()
  for (const item of array) {
    const date = new Date(item)
    const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    dateSet.add(dateString)
  }

  return dateSet.has(dateStringToCheck)
}

export default isInArray
