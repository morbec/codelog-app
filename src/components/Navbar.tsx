import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core/'
import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import CSVExporter from './CSVExporter'

//#region  useStyles
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
//#endregion

const NavbarStyled = styled(AppBar)({
  backgroundColor: '#FE6B8B'
})

export default function Navbar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavbarStyled position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Codelogs
          </Typography>
          <CSVExporter />
        </Toolbar>
      </NavbarStyled>
    </div>
  )
}
