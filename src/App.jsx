import { Box } from '@mui/system';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Router from './routes/Router';
import { useRoutes } from 'react-router-dom';
import { TitleProvider } from './contexts/TitleContext';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#0052A8',
    },
    background: {
      default: '#F9F9F9',
    },
    text: {
      primary: '#375560',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App = () => {
  const routing = useRoutes(Router);
  return (
    <ThemeProvider theme={theme}>
      <TitleProvider>
        <CssBaseline />
        <Box className="App">
          {routing}
        </Box>
      </TitleProvider>
    </ThemeProvider>
  );
};

export default App;