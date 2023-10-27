
import { NavLink } from 'react-router-dom';

import style from './navbar.module.scss';

const data = ['Warehouse', 'Employees', 'Orders', 'Finances'];

export const Navbar = () => {

    const items = data.map(item => (
        <NavLink 
            className={({isActive}) => 
                isActive ? `${style.navbar_item} ${style.active}` : `${style.navbar_item}`
            } 
            to={`/${item.toLowerCase()}`} 
            key={item}
        >
            <li>
                {item}
            </li>
        </NavLink>
    ));

    return (
        <div className={style.navbar}>
            <ul className={style.navbar_list}>
                {items}
            </ul>
        </div>
    )
}
