import { Outlet, ScrollRestoration } from "react-router-dom"

import { Header } from '../Header/Header';
import { Navbar } from "../NavBar/Navbar";

import style from './root.module.scss';
import { useSelector } from "react-redux";

export const Root = () => {
    const {isLogged} = useSelector(state => state.user);

    return (
        <>
            <header className={style.header}>
                <Header />
            </header>

            {isLogged ? (
                <div className="container">
                    <div className={style.root}>

                        <nav className={style.nav}>
                            <Navbar />
                        </nav>

                        <main className={style.main}>
                            <Outlet />
                        </main>

                        <ScrollRestoration />

                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    )
}
