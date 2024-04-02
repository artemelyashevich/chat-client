import React from 'react'
import {useAppDispatch, useAppSelector, useConnectSocket} from "../hooks.ts"
import {fetchMe} from "../store/slices/userSlice.ts";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const {token} = useAppSelector((store => store.auth))
  React.useEffect(() => {
    dispatch(fetchMe(token))
  },[])
  useConnectSocket()
  return (
    <div>Home</div>
  )
}

export default Home