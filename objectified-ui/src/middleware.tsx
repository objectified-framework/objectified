export { default } from 'next-auth/middleware';

export const VERSION: string = "0.0.2";

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