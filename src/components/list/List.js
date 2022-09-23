import React, { useEffect, useState } from "react";
import api from "../../redux/ApiCalls";
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { getEmployee } from "../../redux/employeeSlice";


import './List.css';

export default function List() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const getList = async () => {
      const resp = await api.employeeList();
      const data =  resp.data.body;
      setList(data);
    }

    getList().catch(console.error);    
	}, [list])

  dispatch(getEmployee({employee: null}));

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
    console.log('here',action, state);
  }

  const sizes = [10, 25, 50];

  const handlePaginationChange = event => {
    pagination.fns.onSetSize(event.target.value)
  };

  // Action

  async function handleDelete(id) {
    await api.delete(id)
    setList(list.filter((item) => item.id !== id))
  };

  function onEditBtn(item) {
    dispatch(getEmployee({employee: item}));
    navigate('/employees-form')
  }

  if(list === []) {
    return;
  } 

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
                  <HeaderCellSort className="column-header" sortKey="FIST">Firstname</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="LAST">Lastname</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="START">StartDate</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="DEPART">Department</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="BIRTH">BirthDay</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="STREET">Street</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="CITY">City</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="STATE">State</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="ZIP">Zip code</HeaderCellSort>
                  <HeaderCell className="column-header"></HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row item={item}>
                    <Cell>{item.firstName}</Cell>
                    <Cell>{item.lastName}</Cell>
                    <Cell>{item.startDate}</Cell>
                    <Cell>{item.department}</Cell>
                    <Cell>{item.birthDay}</Cell>
                    <Cell>{item.street}</Cell>
                    <Cell>{item.city}</Cell>
                    <Cell>{item.state}</Cell>
                    <Cell>{item.zipCode}</Cell>
                    <Cell>
                      <button type="button" className="action-btn edit-btn" onClick={() => onEditBtn(item)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button type="button" className="action-btn delete-btn" onClick={() => handleDelete(item._id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </Cell>
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