import { auth } from "./auth";

export default auth((req)=>{
    // req.auth
})

// Optionally if we dont want middleware to be invoked on some paths we can use the following
export const config = {
    // the path in matcher will simply invoke the export default function above 
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}