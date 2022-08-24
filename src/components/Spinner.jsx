import styled from "styled-components";

const Spinner = () => {
  return <StyledSpinner />;
};

const StyledSpinner = styled.div`
  height: 40px;
  width: 40px;
  border-top: 10px solid #00b4ee;
  border-left: 10px solid #00b4ee;
  border-right: 10px solid #00b4ee;
  border-bottom: 10px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
