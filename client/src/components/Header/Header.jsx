import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '../../ui/ErrorMessage/ErrorMessage';
import { Button } from '../../ui/Button/Button';
import { Dropdown } from './Dropdown/Dropdown';
import { InfoBar } from './InfoBar/InfoBar';
import { useClickOutside } from '../../hooks/useClickOutside';

import style from './header.module.scss';

export const Header = () => {
    const { isLogged } = useSelector(state => state.user);
    const {ref, toggle, open} = useClickOutside(false);    

    return (
        <div className={style.header_wrapper}>
            <div className="container">
                <div className={style.header_inner}>

                    <Link className={style.logo} to='/'>
                        Warehouse <span>Manager</span>
                    </Link>

                    {isLogged && (
                        <>
                            <InfoBar />

                            <div className={style.button_box}>
                                <Button name='JohnDoe' color='primary' clickHandler={toggle} />

                                {open && <Dropdown ref={ref} />}
                            </div>
                        </>
                    )}

                </div>
            </div>

            <ErrorMessage />
        </div>
    )
}
