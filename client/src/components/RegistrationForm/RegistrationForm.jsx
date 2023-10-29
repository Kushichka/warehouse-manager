
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';


import { useUserRegistrationMutation } from '../../api/userApi';
import { MdEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { Button } from '../../ui/Button/Button';
import { setError } from '../../redux/slices/errorSlice';

import style from './registrationForm.module.scss';

export const RegistrationForm = () => {
    const [userRegistration, { isError, isSuccess, data, error, isLoading }] = useUserRegistrationMutation();
    const {register, reset, handleSubmit, getValues, formState: { errors }} = useForm({ mode: 'onBlur' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputData = useMemo(() => (
        [
            {
                placeholder: 'Login',
                type: 'text',
                icon: <BsFillPersonFill />,
                rules: {
                    minLength: {
                        value: 3,
                        message: 'Login length: 3-24 characters'
                    },
                    maxLength: {
                        value: 24,
                        message: 'Login length: 3-24 characters'
                    }
                }
            },
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
            },
            {
                placeholder: 'Repeat password',
                type: 'password',
                icon: <BiSolidLockAlt />,
                rules: {
                    validate: value => value === getValues('Password') || 'Password mismatch'
                }
            }
        ]
    ), [getValues]);

    const onSubmit = async (data) => {
        await userRegistration({
            login: data.Login,
            email: data.Email,
            password: data.Password
        });

        reset();
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
        if(isSuccess) {
            dispatch(setError(data));
            navigate('/login');
        };
        
        if(isError) dispatch(setError(error.data));

    }, [isError, isSuccess, error, data, dispatch, navigate]);

    return (
        <div className={style.registration}>
            <div className={style.title_wrapper}>
                <p>Sign up</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.registration_inner}>
                    {inputs}

                    <div className={style.button_wrapper}>
                        <Button
                            name='Create account'
                            color='primary'
                            type='submit'
                            loading={isLoading}
                        />

                        <div className={style.options}>
                            <p>Already have an account?</p>

                            <Link className={style.button_login} to='/login'>
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}
