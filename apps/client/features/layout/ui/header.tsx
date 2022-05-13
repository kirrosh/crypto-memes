import { formatAddress, useMetamaskAuth } from 'features/auth'
import { Navbar, Button } from 'react-daisyui'

export const Header = () => {
  const { auth, signOut, signIn } = useMetamaskAuth()
  return (
    <Navbar>
      <Navbar.Start className="px-2 mx-2">
        <span className="text-lg font-bold">Crypto memes</span>
      </Navbar.Start>

      {/* <Navbar.Center className="px-2 mx-2">
        <div className="flex items-stretch">
          <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
          <a className="btn btn-ghost btn-sm rounded-btn">Portfolio</a>
          <a className="btn btn-ghost btn-sm rounded-btn">About</a>
          <a className="btn btn-ghost btn-sm rounded-btn">Contact</a>
        </div>
      </Navbar.Center> */}

      <Navbar.End className="px-2 mx-2">
        {auth.address && (
          <span className="mr-2">{formatAddress(auth.address)}</span>
        )}
        {auth.address ? (
          <Button color="ghost" onClick={signOut}>
            Log Out
          </Button>
        ) : (
          <Button color="primary" onClick={signIn}>
            Log In
          </Button>
        )}
      </Navbar.End>
    </Navbar>
  )
}
