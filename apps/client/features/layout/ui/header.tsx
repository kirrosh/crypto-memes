import { formatAddress, useMetamaskAuth } from 'features/auth'
import { useRouter } from 'next/router'
import { Navbar, Button } from 'react-daisyui'

export const Header = () => {
  const router = useRouter()
  const { auth, signOut, signIn } = useMetamaskAuth()

  const onLogoClick = () => {
    router.push('/')
  }
  return (
    <Navbar>
      <Navbar.Start className="px-2 mx-2">
        <span
          className="text-lg font-bold cursor-pointer hover:text-primary"
          onClick={onLogoClick}
        >
          Crypto memes
        </span>
      </Navbar.Start>

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
