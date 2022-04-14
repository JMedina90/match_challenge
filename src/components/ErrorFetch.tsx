// Libs
import styled from 'styled-components';

const ErrorFetch = () => {
  return (
    <ErrorContainer>
      <div className="spinner"></div>
      <h3>An error ocurred while loading your matches. Please try again</h3>
    </ErrorContainer>
  );
};

export default ErrorFetch;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
`;
