import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../types.ts";
import { useAppDispatch } from "../hooks.ts";
import { updateMe } from "../store/slices/userSlice.ts";

type TForm = {
    user: IUser,
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileForm: React.FC<TForm> = ({ user, active, setActive }) => {
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<any> = (data: any): void => {
        dispatch(updateMe(data))
        setActive(!active)
        reset()
    }
    const { register, reset, handleSubmit } = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='profile__right-form'>
            <div className='profile__right-form__content'>
                <label>
                    <p>Username: </p>
                </label>
                <input {...register('name')} type='text' defaultValue={user.name} readOnly={!active} />
                <label>
                    <p>Email: </p>
                </label>
                <input {...register('email')} type='text' defaultValue={user.email} readOnly={!active} />
                {
                    active && <React.Fragment>
                        <label>
                            <p>Image URL: </p>
                        </label>
                        <input {...register('image')} placeholder='Image Url' type='text' defaultValue={user.image} />
                    </React.Fragment>}
            </div>
            <button className={`profile__right-form-button${active ? '-active' : ''}`} type='submit'>Save</button>
        </form>
    );
};

export default ProfileForm;
