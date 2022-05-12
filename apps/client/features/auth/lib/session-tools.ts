import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
  NextApiHandler,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

export const ironOptions: IronSessionOptions = {
  cookieName: process.env.IRON_SESSION_COOKIE_NAME || 'siwe',
  password: process.env.IRON_SESSION_PASSWORD || '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions)
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, ironOptions)
}

export type PrivateRouteProps = {
  address: string
}
export const privateRoute = withSessionSsr(async function getServerSideProps({
  req,
  res,
}) {
  if (!req.session.siwe?.address) {
    return {
      redirect: {
        destination: '/start',
        permanent: false,
      },
    }
  }

  return {
    props: {
      address: req.session.siwe?.address,
    } as PrivateRouteProps,
  }
})
