import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footerInner">
          <p className="createdBy">Создатель: </p>
          <Link to={'/user/63df93f5fec1270b8c91f2c0'}>Павел Литов</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
