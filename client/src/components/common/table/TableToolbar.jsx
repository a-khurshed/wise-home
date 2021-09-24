import React, { forwardRef, cloneElement } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { SearchOutlined as SearchOutlinedIcon } from '@material-ui/icons';

export default forwardRef((props, ref) => {
  const {
    title,
    setGlobalFilter,
    globalFilter,
    customFilter,
    className,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <>
      <div className={clsx(className, classes.root)} {...rest} ref={ref}>
        <Toolbar disableGutters>
          <Typography variant='h4' className={classes.title}>
            {title}
          </Typography>

          {customFilter &&
            cloneElement(customFilter, {
              className: clsx(customFilter.props.className, classes.filter),
            })}

          <TextField
            placeholder='Search'
            value={globalFilter || ''}
            onChange={(event) => {
              setGlobalFilter(event.target.value || undefined);
            }}
            margin='none'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            className={classes.filter}
          />
        </Toolbar>
      </div>
    </>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'auto',
  },
  title: {
    flex: '1 1 100%',
    fontWeight: 600,
    marginRight: theme.spacing(4),
  },
  filter: {
    minWidth: 200,
    marginLeft: theme.spacing(2),
  },
}));
