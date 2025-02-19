import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { store, persistor } from "./store";
import createEmotionCache from "./helpers/createEmotionCache";
import muiTheme from "./styles/muiTheme";
import Router from "./routes/Router";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={muiTheme}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                  <CssBaseline />
                  <Router />
                </QueryClientProvider>
              </PersistGate>
            </Provider>
          </SnackbarProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
}

export default App;
