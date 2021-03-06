import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core/'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { generateId } from '../api'

const CodelogDialog = ({ display, setDisplayDialog, handleClick, codelog }) => {
  const [canSave, setCanSave] = useState(true)
  const [open, setOpen] = useState(display)
  const [state, setState] = useState({
    title: '',
    tasks: '',
    blockers: '',
    todayILearned: ''
  })

  useEffect(() => {
    if (codelog) {
      setState({ ...codelog })
    }
  }, [codelog])

  useEffect(() => {
    setCanSave(!(state.title.trim().length > 0 && state.tasks.trim().length > 0))
  }, [state])

  const handleSave = () => {
    codelog = !codelog ? { ...state, id: generateId(), date: new Date().toString() } : { ...state }
    handleClick(codelog)
    setOpen(false)
    if (setDisplayDialog) setDisplayDialog(false)
  }

  const handleClose = () => {
    setOpen(false)
    if (setDisplayDialog) setDisplayDialog(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xl'} aria-labelledby="codelog-form-dialog">
      <DialogTitle id="add-codelog-title">Add new Codelog</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          variant="outlined"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.currentTarget.value })}
        />
        <TextField
          required
          fullWidth
          multiline
          rowsMax="5"
          variant="outlined"
          margin="dense"
          id="tasks"
          label="Tasks"
          type="text"
          value={state.tasks}
          onChange={(e) => setState({ ...state, tasks: e.currentTarget.value })}
        />
        <TextField
          fullWidth
          multiline
          rowsMax="5"
          variant="outlined"
          margin="dense"
          id="blockers"
          label="Blockers"
          type="text"
          value={state.blockers}
          onChange={(e) => setState({ ...state, blockers: e.currentTarget.value })}
        />
        <TextField
          fullWidth
          multiline
          rowsMax="5"
          variant="outlined"
          margin="dense"
          id="todayILearned"
          label="Today I learned"
          type="text"
          value={state.todayILearned}
          onChange={(e) => setState({ ...state, todayILearned: e.currentTarget.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={canSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
CodelogDialog.propTypes = {
  display: PropTypes.bool.isRequired,
  setDisplayDialog: PropTypes.func,
  handleClick: PropTypes.func.isRequired,
  codelog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.string.isRequired,
    blockers: PropTypes.string,
    todayILearned: PropTypes.string
  })
}

export default CodelogDialog
