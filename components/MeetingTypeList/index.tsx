import Image from "next/image";
import HomeCard from "./HomeCard";

const MeetingTypeList = () => {
    return (
        <section className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-4">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="新建会议"
                description="Setup a new recording"
                className="bg-[#ff742e]"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="加入会议"
                description="via invitation link"
                className="bg-[#0e78f9]"/>
            <HomeCard
                img="/icons/schedule.svg"
                title="安排会议"
                description="Plan your meeting"
                className="bg-[#820ef8]"/>
            <HomeCard
                img="/icons/recordings.svg"
                title="会议记录"
                description="Meeting recordings"
                className="bg-[#f9a90e]"/>
        </section>
    )

}
export default MeetingTypeList