export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/classes',
    '/data-types',
    '/fields',
    '/groups',
    '/instances',
    '/links',
    '/namespaces',
    '/properties',
    '/users',
  ]
}