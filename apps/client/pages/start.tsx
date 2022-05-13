import { useMetamaskAuth } from 'features/auth'

const Start = () => {
  const { auth, signIn, signOut } = useMetamaskAuth()

  return (
    <div className="flex-col hero-content lg:flex-row-reverse">
      <img
        src="https://api.lorem.space/image/movie?w=260&h=400"
        className="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <h1 className="text-5xl font-bold">Crypto memes</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button className="btn btn-primary" onClick={signIn}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Start
