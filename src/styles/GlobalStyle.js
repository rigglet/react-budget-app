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
`;

export default GlobalStyle;
