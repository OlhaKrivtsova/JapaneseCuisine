import styles from './Header.module.css';
import headerImg from '../../assets/sushi.webp';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <>
      <header className={styles.header}>
        <h1> Japanese Cuisine</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      {/* <div className={styles['main-image']}>
        <img src={headerImg} alt='Japanese cuisine courses' />
      </div> */}
    </>
  );
};
export default Header;
