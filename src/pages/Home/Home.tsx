import React from 'react'
import {useAppDispatch} from "../../hooks.ts"
import {fetchMe} from "../../store/slices/userSlice.ts";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(fetchMe("\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDI4N2RkZDIwYzFlMzkwYTk3NjlkMSIsInNlc3Npb24iOjMzMS40MTI4OTQyNjg4MTcsImlhdCI6MTcxMjA0NjU5OX0.Z4boR411zWc8QRs9fwZqO5coaBxquqRZWI89z9DMkFQ\""))
  },[])
  return (
    <div>Home</div>
  )
}

export default Home