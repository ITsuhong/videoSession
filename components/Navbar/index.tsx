import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import {ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs'

const Navbar = () => {
    return (
        <main className="w-full  bg-dark-1 fixed z-50 p-4">
            <div className="flex-between">
                <div>
                    <Link href="/" className="flex items-center gap-1">
                        <Image src="/icons/logo.svg" alt="logo" width={32}
                               height={32}>
                        </Image>
                        <p className="text-[20px] font-extrabold text-white max-sm:hidden">
                            YOOM
                        </p>
                    </Link>
                </div>

                <div className="flex-between gap-2">

                    <SignedOut>
                        <SignInButton/>
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <MobileNav/>
                </div>
            </div>
        </main>
    )
}
export default Navbar