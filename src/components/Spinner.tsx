import { FC } from 'react';
import styled from 'styled-components';
import type { ISpinner } from '../interfaces/index';

const Spinner: FC<ISpinner> = ({ text = '' }) => {
  return (
    <SpinnerContainer>
      <div className="spinner"></div>
      <h3>{text}</h3>
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;

  .spinner {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 30px;
  }
  .spinner:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #1927ef;
    border-color: #1927ef transparent #1927ef transparent;
    animation: spinner 1.2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
