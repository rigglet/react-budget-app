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
.line {
    width: 100%;
    margin: 1rem 0;
    background-color: #848586;
    height: 1px;
  }
.button {
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

input {
    outline: none;
    padding: 0.25rem;
    font-size: 1rem;
    background-color: #39393c;
    border-radius: 4px;
    border: #848586 solid 2px;
    color: #848586;
  }

  .inactive-input{
    cursor: default;
  }

  .active-input {
      &:hover,
      &:active,
      &:focus {
        //box shadow used to get rounded "outline" instead of outline: solid 2px #00b4ee
        box-shadow: 0 0 0 2px #00b4ee;
        border-color: #39393c;
        color: white;
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
  .sign {
    margin-right: 0.5rem;
  }
  .symbol {
    margin-right: 0.25rem;
  }
.negative{
  color: red;
}
.positive{
  color:  #00b4ee;
}
.deposit {
    color: #17cf98;
  }
  .withdrawal {
    color: #f58e8e;
  }

  .decimal {
    font-size: 0.7rem;
  }

  //ICONS
  .icon {
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  .del {
    color: #b87272;
    &:hover {
      color: rgba(184, 114, 114, 75%);
    }
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
