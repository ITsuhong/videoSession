"use client"

import {sidebarLinks} from '@/app/constants'
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <section className="bg-dark-1 text-white p-20 px-4 max-sm:hidden">
            <div className="flex flex-col">
                {
                    sidebarLinks.map(item => {
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                        return (
                            <Link href={item.route} key={item.label}
                                  className={cn('flex items-center gap-2 p-2 mb-2 rounded', {
                                      'bg-blue-600': isActive
                                  })}>
                                <Image src={item.imgURL} alt={item.label} width={18}
                                       height={18}></Image>
                                <p className="max-lg:hidden"> {item.label}</p>
                            </Link>
                        )
                    })
                }

            </div>
        </section>
    )
}
export default Sidebar