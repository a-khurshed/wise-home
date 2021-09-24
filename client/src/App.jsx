import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  CssBaseline,
  Container,
  TextField,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

import { actions } from './store';
import { actionTypes } from './constants';
import { Header } from './components';
import { Table } from './components/common';

const App = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    country: { countries },
    loader: { actions: loadingActions },
  } = useSelector((state) => state);
  const [region, setRegion] = useState('europe');
  const [data, setData] = useState([]);
  const columns = [
    {
      Header: 'Flag',
      accessor: 'flag',
      Cell: ({ row }) => (
        <img
          src={row.original.flag}
          alt={`${row.original.name} Flag`}
          className={classes.flag}
        />
      ),
    },
    {
      Header: 'Name',
      accessor: 'name',
      Filter: ({
        column: { filterValue, setFilter },
        size,
        margin,
        onClick,
        className,
      }) => (
        <TextField
          onChange={(event) => setFilter(event.target.value)}
          value={filterValue || ''}
          {...{ size, margin, onClick, className }}
        />
      ),
      filter: (rows, columnIds, filterValue) =>
        rows.filter((row) =>
          _.get(row.original, columnIds[0])
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
        ),
    },
    {
      Header: 'Population Density',
      accessor: 'populationDensity',
      Filter: ({
        column: { filterValue, setFilter },
        size,
        margin,
        onClick,
        className,
      }) => (
        <TextField
          onChange={(event) => setFilter(event.target.value)}
          value={filterValue || ''}
          {...{ size, margin, onClick, className }}
        />
      ),
      filter: (rows, columnIds, filterValue) =>
        rows.filter((row) =>
          _.get(row.original, columnIds[0])
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
        ),
    },
    {
      Header: 'Languages',
      accessor: 'languages',
      Filter: ({
        column: { filterValue, setFilter },
        size,
        margin,
        onClick,
        className,
      }) => (
        <TextField
          onChange={(event) => setFilter(event.target.value)}
          value={filterValue || ''}
          {...{ size, margin, onClick, className }}
        />
      ),
      filter: (rows, columnIds, filterValue) =>
        rows.filter((row) =>
          _.get(row.original, columnIds[0])
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
        ),
    },
    {
      Header: 'Currencies',
      accessor: 'currencies',
      Filter: ({
        column: { filterValue, setFilter },
        size,
        margin,
        onClick,
        className,
      }) => (
        <TextField
          onChange={(event) => setFilter(event.target.value)}
          value={filterValue || ''}
          {...{ size, margin, onClick, className }}
        />
      ),
      filter: (rows, columnIds, filterValue) =>
        rows.filter((row) =>
          _.get(row.original, columnIds[0])
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
        ),
    },
  ];
  const isLoading = loadingActions.includes(actionTypes.country.READ);

  const handleRegionChange = (event) => setRegion(event.target.value);

  const regionFilter = (
    <Select
      label='Region'
      value={region}
      onChange={handleRegionChange}
      MenuProps={{
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
      }}
    >
      <MenuItem value={'africa'}>Africa</MenuItem>
      <MenuItem value={'americas'}>Americas</MenuItem>
      <MenuItem value={'asia'}>Asia</MenuItem>
      <MenuItem value={'europe'}>Europe</MenuItem>
      <MenuItem value={'oceania'}>Oceania</MenuItem>
    </Select>
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(actions.country.read(region));
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, [region, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (countries) {
      setData(
        countries.map((country) => ({
          flag: country.flags[0],
          name: country.name,
          populationDensity:
            Math.round(
              (country.population / country.area + Number.EPSILON) * 100
            ) / 100,
          languages: country.languages
            .map((language) => language.name)
            .join(', '),
          currencies: country.currencies
            .map((currency) => currency.name)
            .join(', '),
        }))
      );
    }
  }, [countries]);

  return (
    <>
      <CssBaseline />

      <Header />

      <Container maxWidth='xl' className={classes.container}>
        <Table
          title='Countries'
          data={data}
          columns={columns}
          isLoading={isLoading}
          customFilter={regionFilter}
        />
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: 600,
  },
  flag: {
    width: 48,
    display: 'block',
  },
  border: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

export default App;
