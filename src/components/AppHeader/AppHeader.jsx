import { NavLink } from 'react-router';
import clsx from 'clsx';
import css from '../AppHeader/AppHeader.module.css';

const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
}

export default function AppHeader() {
    return (
        <header className={css.headerBar}>
            <nav className={css.nav}>
                <ul className={css.list}>
                    <li>
                        <NavLink to="/" className={getLinkStyles} >Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/movies" className={getLinkStyles}> Movies
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}