// Our Easy peasy store for global, constants and reusable functions
import { action, createStore } from 'easy-peasy'
import netmifiLogo from "/netmifi-logo.png" // i moved the logo to the public folder so that it can be accesed easily just by one variable

export default createStore({
    logo: netmifiLogo,
    isLoading: false,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
});