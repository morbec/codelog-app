export const ALL = 'ALL'
export const EDIT = 'UPDATE'
export const DELETE = 'DELETE'
export const DISPLAY = 'DISPLAY'

export const all = () => {
  return { type: ALL }
}

export const editOne = (id: number) => {
  return { type: EDIT, id }
}

export const deleteOne = (id: number) => {
  return { type: DELETE, id }
}

const selectedOne = (id: number) => {
  return { type: DISPLAY, id }
}
