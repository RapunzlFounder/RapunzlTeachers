import React, { Component, Suspense, lazy } from "react";
import AuthLoadingScreen from './routes/AuthLoadingScreen';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import ScrollToTop from './helper_functions/ScrollToTop';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoadingPage from "./components/Admin/LoadingPage";
import './styles/App.css';
import NotFoundPage from "./components/Admin/NotFoundPage";
import ArticleScreen from "./routes/ArticleScreen";

// Handles Route-Based Code Splitting To Reduce Package Size & Improve Loading Times For Project
const NotSignedInScreen = lazy(() => import('./routes/NotSignedInScreen'));
const HomeScreen = lazy(() => import( "./routes/HomeScreen"));

// Handles Creating Wrapper Components For Routes Which Require Navigation Parameters & Props
const ArticleScreenWrapper = (props) => {
  const params = useParams();
  return <ArticleScreen  {...{...props, match: {params}} } />
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00FFB4',
    },
    secondary: {
      main: '#f5a900',
    },
    background: {
      default: '#01110b',
      paper: '#00120a',
    },
    text: {
      primary: 'rgb(255,255,255)',
      secondary: 'rgb(240,255,247)',
      disabled: 'rgb(220,255,223)',
      hint: '#b5ffd9',
    },
    error: {
      main: '#ff2e2e',
    },
    info: {
      main: '#00ff7a',
    },
    success: {
      main: '#00ff43',
    },
    divider: '#085c2a',
  },
  typography: {
    fontFamily: '"Montserat", "Helvetica", "Arial", sans-serif',
  },
});

class App extends Component {
  render() {
    return(
      <BrowserRouter>
      <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<AuthLoadingScreen />} />
            <Route path="article/:articleID" element={<ArticleScreenWrapper />} />
            <Route path="login" element={<Suspense fallback={<LoadingPage />}><NotSignedInScreen /></Suspense>}/>
            <Route path="dashboard" element={<Suspense fallback={<LoadingPage />}><HomeScreen /></Suspense>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
    </BrowserRouter>
    );
  }
}

export default App;

