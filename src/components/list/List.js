import React, { useState } from "react";
import { Table, Header, HeaderRow, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort';
import { Modal } from "simple-react-modal-by-assamoi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { departmentOptions, statesOptions, generateId, formatDate } from "../../utils/utils";

import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './List.css';

export default function List({list}) {
  const [modalOpen, setModalOpen] = useState(false);

  // Modal
  const ModalContent = "Successfully deleted employee !";
  const myTheme = {
    closeBtnColor: "#ffffff",
    closeBtnBgColor: "#2591CE",
  };

  // Table theme
  const theme = useTheme(getTheme());

  // Search
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const data = {
    nodes: list.filter(item => {
      const fullName = `${item.firstName}${item.lastName}`.toLowerCase();
      const reversedFullName = `${item.lastName}${item.firstName}`.toLowerCase();
      const trimmedSearchValue = search.replace(/\s+/g, '').toLowerCase();
      return fullName.includes(trimmedSearchValue) || reversedFullName.includes(trimmedSearchValue);
    }),
  };

  // Sort
  const sort = useSort(
    data,
    {
      state: {
        sortKey: 'FIRST',
        reverse: false,
      },
      onChange: onSortChange,
    },
    {
      sortFns: {
        FIRST: (array) => array.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        LAST: (array) => array.sort((a, b) => a.lastName.localeCompare(b.lastName)),
        START: (array) => array.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
        DEPART: (array) => array.sort((a, b) => a.department.localeCompare(b.department)),
        BIRTH: (array) => array.sort((a, b) => new Date(a.birthDay) - new Date(b.birthDay)),
        STREET: (array) => array.sort((a, b) => a.street.localeCompare(b.street)),
        CITY: (array) => array.sort((a, b) => a.city.localeCompare(b.city)),
        STATE: (array) => array.sort((a, b) => a.state.localeCompare(b.state)),
        ZIP: (array) => array.sort((a, b) => a.zipCode - b.zipCode),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  // Pagination
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const sizes = [10, 25, 50, 100];

  const handlePaginationChange = event => {
    pagination.fns.onSetSize(event.target.value)
  };

  return (
    <div className="list">
      <h1 className="list-title">Current Employees</h1>
      <div className="list-table-header">
        <span>
          show
          <select className="entries-select" onChange={handlePaginationChange}>
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          entries
        </span>
        <label htmlFor="search" className="list-search">
          Search:  
          <input id="search" type="text" value={search} onChange={handleSearch} />
        </label>
      </div>
      <div className="list-table">
        <Table data={data}  theme={theme} sort={sort} pagination={pagination}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow role="row">
                  <HeaderCellSort className="column-header" sortKey="FIRST">Firstname</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="LAST">Lastname</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="START">StartDate</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="DEPART">Department</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="BIRTH">BirthDate</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="STREET">Street</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="CITY">City</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="STATE">State</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="ZIP">Zip code</HeaderCellSort>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>{item.firstName}</Cell>
                    <Cell>{item.lastName}</Cell>
                    <Cell>{item.startDate}</Cell>
                    <Cell>{item.department}</Cell>
                    <Cell>{item.birthDay}</Cell>
                    <Cell>{item.street}</Cell>
                    <Cell>{item.city}</Cell>
                    <Cell>{item.stateAb}</Cell>
                    <Cell>{item.zipCode}</Cell>
                  </Row>
                ))}
                {!tableList.length && 
                  <Row>
                    <Cell className="empty-table" gridColumnStart={1} gridColumnEnd={10}>No data available in table</Cell>
                  </Row>
                }
              </Body>
            </>
          )}
        </Table>

        <div className="pagination">
          <span>
            Showing {pagination.state.getPageBoundaries(data.nodes).start}
            {' to '}
            {pagination.state.getPageBoundaries(data.nodes).end}
            {' of '}
            {data.nodes.length}{' entries'}
          </span>

          <div className="page-navigation">
            <button aria-label="go to start" type="button" disabled={pagination.state.page === 0} onClick={() => pagination.fns.onSetPage(0)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button aria-label="back" type="button" disabled={pagination.state.page === 0} onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <span>{pagination.state.page + 1}</span>
            <button aria-label="next" type="button" disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes) || pagination.state.page === pagination.state.getTotalPages(data.nodes)} 
              onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button aria-label="go to end" type="button" disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes) || pagination.state.page === pagination.state.getTotalPages(data.nodes)}
              onClick={() => pagination.fns.onSetPage(pagination.state.getTotalPages(data.nodes) - 1)}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
      </div>
      <Modal 
        open={modalOpen}
        content={ModalContent}
        theme={myTheme}
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}


List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      birthDay: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      stateAb: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
    })
  )
}