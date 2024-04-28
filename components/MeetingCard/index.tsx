import Image from "next/image";

const MeetingCard = () => {
    return (
        <section className="p-4 rounded-xl bg-[#1c1f2e] text-white">
            <Image src="/icons/upcoming.svg" alt="" width={15} height={15}></Image>
            <h1 className="text-[15px]">Team Sync:Spring Planning & Updates</h1>
        </section>
    )
}

export default MeetingCard