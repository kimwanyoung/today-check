import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }
    body {
        background-color: rgb(240, 240, 240);
    }

    button {
        border: none;
        outline: none;
        cursor: pointer;
    }
      
      button:focus {
        border: none;
        outline: none;
        cursor: pointer;
      }
      
      input:focus {
        outline: none;
      }
      
      li {
        list-style: none;
      }
      
      li {
        list-style: none;
      }
      
      a {
        text-decoration: none;
        color: black;
      }
    @font-face {
        font-family: 'HallymGothic-Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2204@1.0/HallymGothic-Regular.woff2') format('woff2');
        font-weight: 900;
        font-style: normal;
      }
`;

export default GlobalStyles;
