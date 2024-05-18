import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/AppRoutes";
import GlobalModal from "./components/ui/Modal";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalDrawer from "./components/ui/GlobalDrawer";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AppRoutes />
                    <GlobalModal />
                    <Toaster position="top-right" reverseOrder={false} />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Flip}
                    />
                    {/* <NotificationRealtime socket={socket} /> */}
                    <GlobalDrawer />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
