import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import './List.css';


export default function List({list}) {
  const data = list

  return (
    <div className="list">
      <h1 className="list-title">Liste des employés</h1>
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Firstname</HeaderCell>
                <HeaderCell>Lastname</HeaderCell>
                <HeaderCell>StartDate</HeaderCell>
                <HeaderCell>Department</HeaderCell>
                <HeaderCell>BirthDay</HeaderCell>
                <HeaderCell>Street</HeaderCell>
                <HeaderCell>City</HeaderCell>
                <HeaderCell>State</HeaderCell>
                <HeaderCell>Zip code</HeaderCell>
              </HeaderRow>
            </Header>
            {/* <Body>
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
              </Row> */}
            {/* ))}
          </Body> */}
        </>
      )}
      </Table>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array
};