import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}
    *{
        box-sizing: border-box;
    }
    body {
        background-color: rgb(240, 240, 240);
    }
`;

export default GlobalStyles;
