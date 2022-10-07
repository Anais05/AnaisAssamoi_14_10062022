import React, { useEffect, useState } from "react";
import api from "../../redux/ApiCalls";
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getEmployee } from "../../redux/employeeSlice";
import { Modal } from "simple-react-modal-by-assamoi";
import './List.css';

export default function List() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  async function getList() {
    const resp = await api.employeeList();
    const data =  resp.data.body;
    setList(data);
  }

  useEffect(() => {
    getList().catch(console.error);    
	}, [])

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

  const handlePaginationChange = event => {
    pagination.fns.onSetSize(event.target.value)
  };

  // Action
  function onCreateBtn() {
    navigate('/employees-form')
  };

  function onEditBtn(item) {
    dispatch(getEmployee({employee: item}));
    navigate('/employees-form')
  }

  async function handleDelete(id) {
    await api.delete(id)
    setModalOpen(true)
    getList()
  };

  // Date format
  const formatDate = (date) => {
    const newDate = new Date(date)
    const day = (newDate.getDate()).toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`.toString();
  };

  if(list === []) {
    return;
  } 

  return (
    <div className="list">
      <h1 className="list-title">Employee list</h1>
      <div className="list-table-header">
        <label htmlFor="search" className="list-search">
          Search:  
          <input id="search" type="text" value={search} onChange={handleSearch} />
        </label>
        <button className="add-btn bg-dark" onClick={() => onCreateBtn()}>
          <i className="fa-solid fa-plus add-icon"></i>
          Create employee
        </button>
      </div>
      <div className="list-table">
        <Table data={data}  theme={theme} sort={sort} pagination={pagination}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort className="column-header" sortKey="FIRST">Firstname</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="LAST">Lastname</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="START">StartDate</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="DEPART">Department</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="BIRTH">BirthDate</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="STREET">Street</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="CITY">City</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="STATE">State</HeaderCellSort>
                  <HeaderCellSort className="column-header" sortKey="ZIP">Zip code</HeaderCellSort>
                  <HeaderCell className="column-header"></HeaderCell>
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

          <div className="page-navigation">
            <button type="button" disabled={pagination.state.page === 0} onClick={() => pagination.fns.onSetPage(0)}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button type="button" disabled={pagination.state.page === 0} onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <p>{pagination.state.page + 1}</p>
            <button type="button" disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)} 
              onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
            <button type="button" disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
              onClick={() => pagination.fns.onSetPage(pagination.state.getTotalPages(data.nodes) - 1)}
            >
              <i className="fa-solid fa-angles-right"></i>
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