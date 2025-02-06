import { NextResponse } from 'next/server'


export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/" || path === "/home" || path === '/signup' || path === '/login' || path === '/otp' || path === '/contact' || path === '/about';
    const token = request.cookies.get('token')?.value || null;
    console.log("token : " + token);
    // If the user is on the root path, redirect to /home
    if (path === '/') {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    if (path.startsWith('/profile/') && token) {
        return NextResponse.next(); // Allow access to the profile page
    }

    // If the user is not authenticated and tries to access profile, redirect to login
    if (path.includes('/dashboard/profile/') && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (path.includes('/profile') && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!token && path.includes('/profile')) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!token && path.includes('/dashboard')) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // if (!isPublicPath && token) {
    //     return NextResponse.redirect(new URL("/profile/:id*", request.url));
    // }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    return NextResponse.next();

}

export const config = {
    matcher: [
        '/',
        '/home',
        '/login',
        '/signup',
        '/dashboard',
        '/profile',
        '/dashboard/profile',
        '/dashboard/profile/:id*',
        '/otp',
        '/contact',
        '/about'
    ],
}