import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getAllItems, selectItems, selectErrorMessage } from './store';
import { initStreamingConnection } from './store/actions';

const Root = styled.section`
  width: 100vw;
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  height: 75px;
  width: 150px;
  font-size: 12px;
`;

const Headline = styled.h3`
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div`
`;

export const List = () => {
  const items = useSelector(selectItems);
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(initStreamingConnection());
  }, []);

  return (
    <Root className="App">
      {error}
      <UnorderedList>
        {Object.keys(items).map(itemKey => (
          <ListItem key={items[itemKey].name}>
            <Headline>{items[itemKey].name}</Headline>
            <Value>{items[itemKey].state}</Value>
          </ListItem>
        ))}
      </UnorderedList>
    </Root>
  );
}
