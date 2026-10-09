import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from '../../redux/store';
const Authenticationswitcher = dynamic(
    () =>
        import(
            '../../../shared/layout-components/switcher/authenticationswitcher'
        ),
    { ssr: false }
);

const Authenticationlayout = ({ children }) => {
    return (
        <Fragment>
            <Provider store={store}>
                <HelmetProvider>
                    <Helmet>
                        <body className=""></body>
                    </Helmet>
                    {children}
                    <Authenticationswitcher />
                </HelmetProvider>
            </Provider>
        </Fragment>
    );
};

export default Authenticationlayout;
