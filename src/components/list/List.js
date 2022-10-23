import React, { useState, useEffect } from "react";
import { Table, Header, HeaderRow, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Modal } from "simple-react-modal-by-assamoi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './List.css';

export default function List({employees}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(employees);    
	}, [employees])

  const navigate = useNavigate();

  // Modal
  const ModalContent = "Successfully deleted employee !";
  const myTheme = {
    closeBtnColor: "#ffffff",
    closeBtnBgColor: "#2591CE",
  };

  // Theme
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

  const sizes = [10, 25, 50];

  const handlePaginationChange = event => {
    pagination.fns.onSetSize(event.target.value)
  };

  // Action
  function onCreateBtn() {
    navigate('/form')
  };

  // Date format
  const formatDate = (date) => {
    const newDate = new Date(date)
    const day = (newDate.getDate()).toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`.toString();
  };

  return (
    <div className="list">
      <h1 className="list-title">Employee list</h1>
      <div className="list-table-header">
        <label htmlFor="search" className="list-search">
          Search:  
          <input id="search" type="text" value={search} onChange={handleSearch} />
        </label>
        <button className="add-btn btn bg-dark" onClick={() => onCreateBtn()}>
          <FontAwesomeIcon className="add-icon" icon={faPlus} />
          Create employee
        </button>
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
                  <Row key={item._id} item={item}>
                    <Cell>{item.firstName}</Cell>
                    <Cell>{item.lastName}</Cell>
                    <Cell>{formatDate(item.startDate)}</Cell>
                    <Cell>{item.department}</Cell>
                    <Cell>{formatDate(item.birthDay)}</Cell>
                    <Cell>{item.street}</Cell>
                    <Cell>{item.city}</Cell>
                    <Cell>{item.state}</Cell>
                    <Cell>{item.zipCode}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination">
          <span>
            page size:{' '}
            <select onChange={handlePaginationChange}>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
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
  employees: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
}