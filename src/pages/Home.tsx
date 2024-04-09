import React from 'react'
import {useAppDispatch} from "../hooks.ts"
import {fetchMe} from "../store/slices/userSlice.ts";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(fetchMe())
  },[])
  return (
    <React.Fragment>Home</React.Fragment>
  )
}

export default Home