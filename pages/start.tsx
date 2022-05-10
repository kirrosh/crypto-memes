import { useMetamaskAuth } from 'features/auth'

const Start = () => {
  const [auth, signIn, signOut] = useMetamaskAuth()

  return (
    <div>
      <h1>Start</h1>
      <button onClick={signIn}>Login</button>
    </div>
  )
}

export default Start
