//font-family: 'Inter', sans-serif;
//font-family: 'Lobster', cursive;
//font-family: 'Montserrat', sans-serif;
//background-color: #1f2023
//nav font color: #848586
//nav font selected color: #f3f3f4
//nav highlight color #00b4ee
//headline color#ffffff
//subheader color #656b74
//box color #39393c
//icon color #73797e

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    color: #FFFFFF;
    background: #1f2023;
    //font-family: 'Inter', sans-serif;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
}

button {
  font-weight: lighter;
  font-size: 10pt;
  min-width: 100px;
    cursor: pointer;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    border: none;
    background-color: #00b4ee;
    transition: all 0.3s ease;
    outline-style: none;
    &:active {
      transform: translateY(1px);
      transition: none;
    }
    &:hover,
    &:active {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
      background: rgb(0, 180, 238, 0.5);
    }
  }
  select{
    outline-style: none;
    outline: none;
    color: #39393c;
    border-radius: 4px;
    padding:0.25rem;
    font-weight: 700;
    font-size: 10pt;
  }
    option{
      padding:0.25rem;
    }
.negative{
  color: red;
}
.positive{
  color:  #00b4ee;
}
.whole {}
  .decimal {
    font-size: 0.7rem;
  }

//React-toastify - Toast close button
.toastClose{
    color: #689ed0;
    cursor: pointer;
    height: 20px;
    width: 20px;
    &:hover{
        color: transparent;
        color: grey;
    }
    &:active,
    &:focus {
      outline-style: none;
      -moz-outline-style: none;
      transform: translateY(1px);
    }
}
`;

export default GlobalStyle;
