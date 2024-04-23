import React from 'react';

const Footer = () => {
    function getYear() {
        const date = new Date();
        const currentYear = date.getFullYear();
        return currentYear;
    }

    return ( 
        <footer className="main-footer Bk-color-black secondary-font">
            <strong>Copyright © {getYear()} <a href="https://bakano.ec/" className='Bk-link'>BAKANO</a></strong>
        </footer>
     );
}
 
export default Footer;