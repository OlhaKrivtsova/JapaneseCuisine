import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <>
      <header className={styles.header}>
        <h1> Japanese Cuisine</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </>
  );
};
export default Header;
