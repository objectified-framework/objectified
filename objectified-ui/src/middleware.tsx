export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/classes',
    '/data-types',
    '/fields',
    '/generation',
    '/groups',
    '/instances',
    '/links',
    '/namespaces',
    '/properties',
    '/users',
  ]
}