import React, { useState } from 'react';
import clsx from 'clsx';
import {
  useGlobalFilter,
  usePagination,
  useFilters,
  useSortBy,
  useTable,
} from 'react-table';
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import TableToolbar from './TableToolbar';
import TablePagination from './TablePagination';

const Table = (props) => {
  const { title, data, columns, isLoading, customFilter } = props;
  const classes = useStyles();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    gotoPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      autoResetGlobalFilter: false,
      autoResetFilters: false,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  const [clickedRow, setClickedRow] = useState(-1);

  const handlePageChange = (event, newPage) => gotoPage(newPage);

  const handleRowsPerPageChange = (event) =>
    setPageSize(Number(event.target.value));

  const renderTable = (
    <TableContainer>
      {isLoading ? (
        <div className={classes.emptyTable}>
          <CircularProgress />
        </div>
      ) : (
        <MuiTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...(column.id === 'flag'
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    <div className={classes.filterContainer}>
                      <div className={classes.headerContainer}>
                        {column.render('Header')}

                        {column.id !== 'flag' ? (
                          <TableSortLabel
                            active={column.isSorted}
                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                          />
                        ) : null}
                      </div>

                      {column.Filter &&
                        column.render('Filter', {
                          onClick: (event) => {
                            event.stopPropagation();
                          },
                          size: 'small',
                          margin: 'none',
                          className: classes.filter,
                        })}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);

                return (
                  <TableRow
                    hover
                    onClick={() => setClickedRow(row.id)}
                    className={clsx(
                      clickedRow === row.id && classes.clickedRow
                    )}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={classes.emptyTableCell}
                >
                  <Typography align='center' color='textSecondary'>
                    No data available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      )}
    </TableContainer>
  );

  return (
    <>
      <TableToolbar
        title={title}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        customFilter={customFilter}
      />

      {renderTable}

      <TablePagination
        count={data.length}
        page={pageIndex}
        rowsPerPage={pageSize}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex',
  },
  filter: {
    marginTop: 6,
    maxWidth: 200,
  },
  emptyTable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  emptyTableCell: {
    paddingBottom: 180,
    paddingTop: 180,
  },
  clickedRow: {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default Table;
