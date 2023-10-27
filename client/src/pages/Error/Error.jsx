import { Link, useRouteError } from "react-router-dom";

import style from './error.module.scss';

export const Error = () => {
    const error = useRouteError();

    return (
        <main>
            <div className="container">
                <div className={style.error_page}>

                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.status}</i>
                    </p>
                    <Link className={style.button} to='/'>
                        Go home
                    </Link>

                </div>
            </div>
        </main>
    );
}