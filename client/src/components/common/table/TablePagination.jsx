import React, { forwardRef } from 'react';
import { makeStyles, TablePagination } from '@material-ui/core';

export default forwardRef((props, ref) => {
  const {
    count,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <TablePagination
      component='div'
      rowsPerPageOptions={[
        5,
        10,
        25,
        {
          label: 'All',
          value: count,
        },
      ]}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage='Rows per Page:'
      SelectProps={{
        MenuProps: {
          classes: {
            paper: classes.border,
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          getContentAnchorEl: null,
          elevation: 0,
        },
      }}
      backIconButtonText='Previous Page'
      nextIconButtonText='Next Page'
      {...rest}
      ref={ref}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  border: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));
