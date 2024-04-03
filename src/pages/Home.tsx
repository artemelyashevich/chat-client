import React from 'react'
import {useAppDispatch, useAppSelector} from "../hooks.ts"
import {fetchMe} from "../store/slices/userSlice.ts";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const {token} = useAppSelector((store => store.auth))
  React.useEffect(() => {
    dispatch(fetchMe(token))
  },[])
  return (
    <div>Home</div>
  )
}

export default Home