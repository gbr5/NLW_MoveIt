import '../styles/global.css';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    font-family: 'Open Sans', sans-serif;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ChallengesProvider>
          <Component {...pageProps} />
        </ChallengesProvider>
      </ThemeProvider>
    </>
  );
}

export default App
