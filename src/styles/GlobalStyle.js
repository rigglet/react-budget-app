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

:root {
  --income-color: #1effa5;
  --allocated-color: #9f5f90;
  --unallocated-color: #22a2bb;
  --balance-color: #dee14b;
  --expenditure-color: #e52424;
  --highlight-color: #00b4ee;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

//colors
.income-color{
  color: var(--income-color);
}
.allocated-color{
  color: var(--allocated-color);
}
.unallocated-color{
  color: var(--unallocated-color);
}
.balance-color{
  color: var(--balance-color);
}
.expenditure-color{
  color: var(--expenditure-color);
}
//background utility classes 
.background-income-color{
  background-color: var(--income-color);
}
.background-allocated-color{
  background-color: var(--allocated-color);
}
.background-unallocated-color{
  background-color: var(--unallocated-color);
}
.background-balance-color{
  background-color: var(--balance-color);
}
.background-expenditure-color{
  background-color: var(--expenditure-color);
}

body{
    color: #FFFFFF;
    background: #1f2023;
    //font-family: 'Inter', sans-serif;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
}

.line {
    width: 90%;
    background-color: #848586;
    height: 1px;
  }

.button {
  font-weight: lighter;
  border-radius: 8px;
  font-size: 0.8rem;
  font-variant-caps: all-small-caps;
  font-weight: 400;
  padding: 0.5rem 0.75rem;
  min-width: 100px;
  border: 2px solid var(--highlight-color);
  color: var(--highlight-color);
  background-color: #39393c;
  cursor: pointer;
  
  transition: all 0.3s ease;
  outline-style: none;
  &:active {
    transform: translateY(1px);
    transition: none;
  }
  &:hover,
  &:active {
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
    background: var(--highlight-color);
    color: #39393c;
  }
}

input, select {
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

  /* select{
    outline-style: none;
    outline: none;
    color: #39393c;
    border-radius: 4px;
    padding:0.25rem;
    font-weight: 700;
    font-size: 10pt;
  } */
    
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
    color: #17cf98 !important;
  }

  .withdrawal {
    color: #f58e8e !important;
  }

  .key-deposit {
    background-color: #17cf98 !important;
  }

  .key-withdrawal {
    background-color: #f58e8e !important;
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

//SUMMARY KEY
.key {
    width: 100%;
    display: flex;
    column-gap: 1.5rem;
    row-gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    
    .element {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      flex-shrink: 1;
      
      .color {
        width: 25px;
        height: 25px;
        border-radius: 4px;
      }
      .legend {
        color: whitesmoke;
      }
    }

  }
`;

export default GlobalStyle;
