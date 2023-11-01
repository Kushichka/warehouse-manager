import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setError } from '../../redux/slices/errorSlice';

import style from './errorMessage.module.scss';

export const ErrorMessage = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.error);

  const isHide = message?.length > 0 ? '' : 'hide';

  useEffect(() => {
    let deleteMessage = null;

    if (message?.length > 0) {
      deleteMessage = setTimeout(() => {
        dispatch(setError(''));
        
      }, 2000);
    }

    return () => {
      clearTimeout(deleteMessage);
    }
  }, [message, dispatch]);

  return (
    <div className={`${style.error} ${isHide}`}>
      {message}
    </div>
  )
}
