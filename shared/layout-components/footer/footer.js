import Link from 'next/link';
import { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>
            <footer className="footer mt-auto py-3 bg-white text-center">
                <div className="container">
                    <span className="text-muted">
                        {' '}
                        Copyright © <span id="year"> 2025</span>. Todos os direitos reservados
                    </span>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;
