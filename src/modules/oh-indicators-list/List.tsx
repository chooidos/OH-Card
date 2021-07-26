import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { actions, selectors } from './store';
import { ConnectionIndicator } from '../../components/atoms/connection-indicator/ConnectionIndicator';

const Root = styled.section`
  width: 100vw;
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ListItem = styled.li`
  height: 75px;
  width: 150px;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: 2px 2px 15px 1px rgb(0 0 0 / 10%);
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Headline = styled.h3`
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div``;

export const List = () => {
  const items = useSelector(selectors.selectItems);
  const error = useSelector(selectors.selectErrorMessage);
  const isSeeConnected = useSelector(selectors.selectIsConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllItems());
    dispatch(actions.initConnection());
    return () => {
      dispatch(actions.closeConnection());
    };
  }, []);

  return (
    <>
      <div style={{ margin: '1rem 2rem' }}>
        <ConnectionIndicator isConnected={isSeeConnected} />
      </div>
      <Root className="App">
        {error}
        <UnorderedList>
          {Object.keys(items).map((itemKey) => {
            const { name, state } = items[itemKey];
            return (
              <ListItem key={name}>
                <Headline>{name}</Headline>
                <Value>{state}</Value>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Root>
      <Link to="/test">esfdsfdf</Link>
    </>
  );
};
