import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { BiSolidLockAlt } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { useGetUserByEmailMutation } from '../../api/userApi';
import { setError } from '../../redux/slices/errorSlice';
import { Button } from '../../ui/Button/Button';
import { useLogin } from '../../hooks/useLogin';

import style from './loginForm.module.scss';

const inputData = [
    {
        placeholder: 'Email',
        type: 'email',
        icon: <MdEmail />,
        rules: {
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email format'
            }
        }
    },
    {
        placeholder: 'Password',
        type: 'password',
        icon: <BiSolidLockAlt />,
        rules: {
            minLength: {
                value: 6,
                message: 'Password length: 6-32 characters'
            },
            maxLength: {
                value: 32,
                message: 'Password length: 6-32 characters'
            }
        }
    }
];

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useLogin();
    const [getUserbyEmail, { isError, isSuccess, data, error, isLoading }] = useGetUserByEmailMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    const onSubmit = async (data) => {
        const user = await getUserbyEmail({
            email: data.Email,
            password: data.Password
        });

        if(user.data) {
            userLogin(user.data);
        }
    }

    const inputs = inputData.map(({ type, placeholder, icon, rules }) => (
        <div className={style.input_with_icon} key={placeholder}>
            <div className={style.form_icon}>
                {icon}
            </div>

            <input
                className={style.form_input}
                {...register(placeholder, rules)}
                type={type}
                placeholder={placeholder}
            />

            <p
                className={classNames({
                    [style.form_error]: true,
                    [style.hide]: !errors[placeholder]
                })}
            >
                {errors[placeholder]?.message || 'Error'}
            </p>
        </div>
    ));

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        };

        if (isError) dispatch(setError(error.data));

    }, [isSuccess, isError, data, error, dispatch, navigate]);

    return (
        <div className={style.login}>
            <div className={style.title_wrapper}>
                <p>Log in</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.login_inner}>
                    {inputs}

                    <div className={style.button_wrapper}>
                        <Button
                            name='Log In'
                            color='primary'
                            type='submit'
                            loading={isLoading}
                        />

                        <div className={style.options}>
                            <p>Don't have an account?</p>

                            <Link className={style.button_login} to='/registration'>
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}
