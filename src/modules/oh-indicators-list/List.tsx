import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ConnectionIndicator } from '../../components/atoms/connection-indicator/ConnectionIndicator';
import { store } from '../../store';

import { getAllItems, selectItems, selectErrorMessage } from './store';
import { selectIsConnected } from './store/selectors';

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
  const items = useSelector(selectItems);
  const error = useSelector(selectErrorMessage);
  const isSeeConnected = useSelector(selectIsConnected);
  const dispatch = useDispatch();

  useEffect((): any => {
    dispatch(getAllItems());
    dispatch({ type: 'items/sse/connection/init' });
    return () => dispatch({ type: 'items/sse/connection/close' });
  }, []);

  return (
    <>
      <div style={{ margin: '1rem 2rem' }}>
        <ConnectionIndicator isConnected={isSeeConnected} />
      </div>
      <Root className="App">
        {error}
        <UnorderedList>
          {Object.keys(items).map((itemKey) => (
            <ListItem key={items[itemKey].name}>
              <Headline>{items[itemKey].name}</Headline>
              <Value>{items[itemKey].state}</Value>
            </ListItem>
          ))}
        </UnorderedList>
      </Root>
      <Link to="/test">esfdsfdf</Link>
    </>
  );
};
