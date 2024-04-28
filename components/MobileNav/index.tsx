"use client"

import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import {sidebarLinks} from "@/app/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const MobileNav = () => {
    const pathName = usePathname()
    return (
        <section className="sm:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Image src="/icons/hamburger.svg" width={26}
                           height={26}
                           alt="hamburger icon"
                           className="cursor-pointer">
                    </Image>
                </SheetTrigger>
                <SheetContent side="left" className="bg-dark-1 border-none">
                    <Link href="/" className="flex items-center gap-1">
                        <Image
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="yoom logo"
                        />
                        <p className="text-[26px] font-extrabold text-white">YOOM</p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose className="border-none" asChild>
                            <section className=" mt-4 flex flex-col gap-2 text-white w-full overflow-y-hidden">
                                {
                                    sidebarLinks.map(item => {
                                        const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                                        return (
                                            <SheetClose asChild key={item.route} className="border-none">
                                                <Link
                                                    href={item.route}
                                                    key={item.label}
                                                    className={cn(
                                                        'border-none flex gap-4 items-center p-4 rounded-lg w-full max-w-90',
                                                        {
                                                            'bg-blue-1': isActive,
                                                        }
                                                    )}
                                                >
                                                    <Image
                                                        src={item.imgURL}
                                                        alt={item.label}
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <p className="font-semibold">{item.label}</p>
                                                </Link>
                                            </SheetClose>
                                        )
                                    })
                                }
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
export default MobileNav