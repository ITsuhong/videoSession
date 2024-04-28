import Image from "next/image";
import {cn} from "@/lib/utils";

interface HomeCardProps {
    className?: string;
    img: string;
    title: string;
    description: string;
    handleClick?: () => void;
}

const HomeCard = ({className, img, title, description, handleClick}: HomeCardProps) => {
    return (
        <div
            className={cn('p-4  rounded-xl  cursor-pointer min-h-[200px] flex flex-col justify-between', className)}>
            <div className="flex-center bgCover size-10 rounded-[10px]">
                <Image src={img} alt="meeting" width={17} height={17}/>
            </div>
            <div className="text-white">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}
export default HomeCard