import MeetingTypeList from "@/components/MeetingTypeList";

const HomePage = () => {
    const now = new Date();

    const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    const date = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format(now);
    return (
        <section className="size-full flex flex-col">
            <div className="bg-hero h-[300px] w-full rounded-xl flex flex-col justify-between p-4 text-white">
                <h2 className="bg-[#2d3948] bg-opacity-50  text-white p-3 max-w-[273px] rounded  text-center text-base font-normal">
                    Upcoming Meeting at: 12:30 PM
                </h2>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-semibold">{time}</h1>
                    <h1 className="text-2xl font-medium">{date}</h1>
                </div>
            </div>
            <MeetingTypeList/>
        </section>
    )
}
export default HomePage