import './navbar.css';
import mainLogo from '../../assets/main-logo.png';

const Navbar = () => {
  return (
    <div className="app__navbar">
      <div className="app__navbar-logo">
        <img style={{ width: '70px' }} src={mainLogo} alt="logo" />
      </div>

      <div className="app__navbar-links">
        <ul className="app__navbar-links_list">
          <li className="app__navbar-links_list-item">
            <a href="#budgeting">Budgeting</a>
          </li>
          <li className="app__navbar-links_list-item">
            <a href="#budgeting">Loan & Debt</a>
          </li>
          <li className="app__navbar-links_list-item">
            <a href="#budgeting">Investing</a>
          </li>
          <li className="app__navbar-links_list-item">
            <a href="#budgeting">Calculator</a>
          </li>
        </ul>
      </div>

      <div className="app__navbar-login">
        <p className="login__btn">Log In</p>
        <p className="register__btn">Register</p>
      </div>
    </div>
  );
};

export default Navbar;
