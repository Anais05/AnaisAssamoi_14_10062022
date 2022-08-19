import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table, Header, HeaderRow, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort';
import './List.css';

export default function List({list}) {
  // Theme
  const theme = useTheme(getTheme());

  // Search
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const data = {
    nodes: list.filter((item) => item.firstName.toLowerCase().includes(search.toLowerCase())),
  };

  // Sort
  const sort = useSort(
    data,
    {
      state: {
        sortKey: 'FIRST',
        reverse: true,
      },
      onChange: onSortChange,
    },
    {
      sortFns: {
        FIRST: (array) => array.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        LAST: (array) => array.sort((a, b) => a.lastName.localeCompare(b.lastName)),
        START: (array) => array.sort((a, b) => a.startDate - b.startDate),
        DEPART: (array) => array.sort((a, b) => a.department.localeCompare(b.department)),
        BIRTH: (array) => array.sort((a, b) => a.birthDay - b.birthDay),
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

  return (
    <div className="list">
      <h1 className="list-title">Liste des employés</h1>
      <div className="list-table">
        <label htmlFor="search" className="list-search">
          Recherche: 
          <input id="search" type="text" value={search} onChange={handleSearch} />
        </label>
        <Table data={data}  theme={theme} sort={sort} pagination={pagination}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort sortKey="FIST">Firstname</HeaderCellSort>
                  <HeaderCellSort sortKey="LAST">Lastname</HeaderCellSort>
                  <HeaderCellSort sortKey="START">StartDate</HeaderCellSort>
                  <HeaderCellSort sortKey="DEPART">Department</HeaderCellSort>
                  <HeaderCellSort sortKey="BIRTH">BirthDay</HeaderCellSort>
                  <HeaderCellSort sortKey="STREET">Street</HeaderCellSort>
                  <HeaderCellSort sortKey="CITY">City</HeaderCellSort>
                  <HeaderCellSort sortKey="STATE">State</HeaderCellSort>
                  <HeaderCellSort sortKey="ZIP">Zip code</HeaderCellSort>
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
          taille de la page:{' '}
            {sizes.map((size) => (
              <button
                className="pagination-btn"
                key={size}
                type="button"
                style={{
                  fontWeight: pagination.state.size === size ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetSize(size)}
              >
                {size}
              </button>
            ))}
            <button
              className="pagination-btn"
              type="button"
              style={{
                fontWeight: pagination.state.size === data.nodes.length ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetSize(data.nodes.length)}
            >
              tout
            </button>
          </span>

          <span>
            Page:{' '}
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                className="pagination-btn"
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array
};