import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actions, selectors } from '../../../modules/oh-indicators-list/store';
import { selectors as uiSelectors } from '../../../modules/ui-room-builder/store';
import { updateServerUrl } from '../../../modules/ui-room-builder/store/slice';

import { ConnectionIndicator } from '../../atoms/connection-indicator/connection-indicator';
import { SquareButton } from '../../atoms/square-button/square-button';

const Form = styled.form`
  width: 680px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 15%);
  background: #faffff;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 50%;
  padding: 5px;
  margin-right: 20px;
  border: 2px solid #396464;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 10px;
  &:focus {
    border: 2px solid #000;
  }
`;

const Span = styled.span`
  font-size: 18px;
  margin-right: 5px;
`;

export const SettingsForm = () => {
  const serverUrl = useSelector(uiSelectors.selectServerUrl);
  const dispatch = useDispatch();
  const sseState = useSelector(selectors.selectIsConnected);

  const tryConnection = () => {
    dispatch(actions.closeSseConnection);
    dispatch(actions.initSseConnection({ url: serverUrl, items: '*' }));
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label htmlFor="server_base_url">Server Url</Label>
        <Input
          type="url"
          name="server_base_url"
          value={serverUrl}
        //   onChange={(e) => setServerUrl(e.target.value)}
          onChange={(e) => dispatch(updateServerUrl(e.target.value))}
        />
        <SquareButton type="button" onClick={tryConnection}>
          Connect
        </SquareButton>
      </div>
      <Span>Connection Status:</Span>
      <ConnectionIndicator connectionState={sseState.state} />
    </Form>
  );
};
