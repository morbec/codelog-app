import { Fab } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CodelogDialog from './CodelogDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
)

export default function AddButton({ handleClick }) {
  const classes = useStyles()
  const [displayDialog, setDisplayDialog] = useState(false)

  useEffect(() => {})

  const handleButtonClick = () => {
    setDisplayDialog(true)
  }

  return (
    <React.Fragment>
      <div>
        <Fab color="primary" className={classes.fab}>
          <Add onClick={handleButtonClick} />
        </Fab>
        {displayDialog && (
          <CodelogDialog
            display={displayDialog}
            setDisplayDialog={setDisplayDialog}
            handleClick={handleClick}
          />
        )}
      </div>
    </React.Fragment>
  )
}
AddButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}
