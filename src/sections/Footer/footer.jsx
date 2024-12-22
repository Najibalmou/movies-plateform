import './footer.css';

function Footer() {
    return (
        <>
            <div className="footer-section">
                <p>&copy; {new Date().getFullYear()} Movie Platform. All Rights Reserved.</p>
            </div>
        </>
    );
}

export default Footer;
