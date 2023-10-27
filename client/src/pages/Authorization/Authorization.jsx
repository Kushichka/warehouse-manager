import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import style from './authorization.module.scss';

export const Authorization = ({auth}) => {
    return (
        <section>
            <div className={style.auth}>
                {auth ? (
                    <LoginForm />
                ) : (
                    <RegistrationForm />
                )}
            </div>
        </section>
    )
}
