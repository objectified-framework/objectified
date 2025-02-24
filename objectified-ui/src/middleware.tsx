export { default } from 'next-auth/middleware';

export const VERSION: string = "0.0.2";

export const config = {
  matcher: [
    '/',
    '/classes',
    '/class-properties',
    '/data-types',
    '/designer',
    '/fields',
    '/properties',
    '/whats-new',
  ]
}