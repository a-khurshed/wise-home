import React from 'react';
import { AppBar, Container, Toolbar, makeStyles } from '@material-ui/core';

import { logo } from '../assets/images';

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' color='default' className={classes.appBar}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img src={logo} alt='Wise Home Logo' className={classes.logo} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  logo: {
    height: 42,
  },
}));

export default Header;
