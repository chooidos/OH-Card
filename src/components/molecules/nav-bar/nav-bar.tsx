import { Edit24, EditOff24, Save24, Settings24 } from '@carbon/icons-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { actions as uiActions } from '../../../modules/ui-room-builder/store';
import { CircleButton } from '../../atoms/circle-button/circle-button';

interface Props {
  isInEditMode: boolean;
  editModeHandler: () => void;
}

const StyledBar = styled.nav`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const Branding = styled.div`
  width: auto;
  padding: 10px 30px;
  color: #396464;
  font-size: 24px;
  font-weight: 700;
  transition: color ease-in-out 0.25s;
  &:hover {
    color: #000000;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const Button = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

export const NavBar = ({ isInEditMode, editModeHandler }: Props) => {
  const dispatch = useDispatch();
  return (
    <StyledBar>
      <Branding>
        <Link to="/">GO TO CARDS</Link>
      </Branding>
      <ButtonGroup>
        {isInEditMode ? (
          <>
            <Button onClick={() => dispatch(uiActions.saveUiStateToStorage())}>
              <CircleButton>
                <Save24 />
              </CircleButton>
            </Button>
            <Button>
              <CircleButton>
                <Link to="/settings">
                  <Settings24 />
                </Link>
              </CircleButton>
            </Button>
            <Button>
              <CircleButton onClick={editModeHandler}>
                <Link to="/">
                  <EditOff24 />
                </Link>
              </CircleButton>
            </Button>
          </>
        ) : (
          <Button>
            <CircleButton onClick={editModeHandler}>
              <Edit24 />
            </CircleButton>
          </Button>
        )}
      </ButtonGroup>
    </StyledBar>
  );
};
