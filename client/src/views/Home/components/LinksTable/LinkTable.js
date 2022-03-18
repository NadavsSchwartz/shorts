/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from 'react-redux';
import { deleteShortLink } from 'store/actions/shortLinkAcionts';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Button, Grid, Snackbar } from '@mui/material';
import TrafficByState from '../TrafficByState';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

//   IE11 support
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'location',
    label: 'Location Data',
  },
  {
    id: 'createdAt',
    label: 'Date',
    responsive: true,
  },
  {
    id: 'totalClicks',
    label: 'Clicks',
  },
  {
    id: 'shortUrl',
    label: 'Short Url',
  },
  {
    id: 'longUrl',
    label: 'Destination URL',
    responsive: true,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'longUrl' ? 'left' : 'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              display: headCell.responsive && { xs: 'none', md: 'table-cell' },
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Links Data
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ AllShortLinks }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('clicks');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [successCopyUrlMessage, SetSuccessCopyUrlMessage] = useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = AllShortLinks.map((n) => n.shortUrl);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleDelete = async () => {
    dispatch(deleteShortLink(selected));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - AllShortLinks.length) : 0;

  const handleCloseCopyMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    SetSuccessCopyUrlMessage(false);
  };
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Snackbar
        open={successCopyUrlMessage}
        autoHideDuration={6000}
        onClose={handleCloseCopyMessage}
      >
        <Alert
          onClose={handleCloseCopyMessage}
          severity="success"
          sx={{ width: '100%' }}
        >
          Successfully copied the short url!
        </Alert>
      </Snackbar>
      <Paper sx={{ height: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, tableLayout: 'auto' }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={AllShortLinks.length}
            />
            <TableBody>
              {/*for IE11 support  */}
              {stableSort(AllShortLinks, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((Link, index) => {
                  const isItemSelected = isSelected(Link.shortUrl);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={Link.shortUrl}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, Link.shortUrl)}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ width: '300px' }} align="center">
                        {Link && Link.location.length !== 0 ? (
                          <TrafficByState AllLocations={Link.location} />
                        ) : (
                          <Grid container>
                            <Grid
                              container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                src="https://png2.cleanpng.com/sh/dfd8b508ed7f4b2c24498078edc7fed7/L0KzQYm4UcEzN6d2eZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TfFld5NqRdt1bIX2hMPolP9zNZJzed5EdHnmg37sjvNieKR6Rdl7Znnmf37rhb1jaaN3eeU2aXPyfrF6TfdzaaVui59tZT3xdbj2gBlwe146etcENHblR4boWPJlOF87SKYEMki7SIK8VMIxOWcATaM8N0C8PsH1h5==/kisspng-computer-icons-adobe-illustrator-analytics-encapsu-grfico-de-barras-iconos-gratis-de-negocios-5be94fb75a8bd0.6049288815420169513709.png"
                                alt="no analytics icon"
                                width={100}
                              />
                            </Grid>
                            <Grid
                              container
                              sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant="caption">
                                {' '}
                                Analytics appear after links are visited
                              </Typography>
                            </Grid>
                          </Grid>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                        align="center"
                      >
                        {Link.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="center">{Link.totalClicks}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() =>
                            navigator.clipboard
                              .writeText(Link.shortUrl)
                              .then(() =>
                                SetSuccessCopyUrlMessage(
                                  !successCopyUrlMessage,
                                ),
                              )
                          }
                        >
                          {Link.shortUrl}
                          <ContentCopyIcon />
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                      >
                        {' '}
                        <Typography
                          noWrap
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '300px',
                          }}
                        >
                          {Link && Link.longUrl}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={AllShortLinks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
