import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/'
import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import React from 'react'

// const useStyles = makeStyles((theme: Theme) =>
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: 'center'
    }
  })
)

const Navbar = styled(AppBar)({
  backgroundColor: '#FE6B8B'
})

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Navbar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Codelogs
          </Typography>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="add">
            <Add />
          </IconButton>
          {/* <Button color="inherit">Add</Button> */}
        </Toolbar>
      </Navbar>
    </div>
  )
}
