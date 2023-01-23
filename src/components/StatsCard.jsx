import { BsArrowDown, BsArrowUp } from "react-icons/bs"

const StatsCard = () => {
  return (
    <>
    <div className="section mt-12 flex justify-between gap-4">
        <div className="shadow-stats rounded-lg p-4 w-64">
            <div className="flex gap-[10px]">
                <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10">
                    <BsArrowUp className="absolute text-btngreen font-semibold"/>
                </div>
                <h2 className="font-bold text-[30px] text-gray20">Status</h2>
            </div>
            <p className="pt-4 pb-4 font-normal text-sm">Your status is <span className="font-bold">active</span></p>
        </div>
        <div className="shadow-stats rounded-lg p-4 w-64">
            <div className="flex gap-[10px]">
                <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10">
                    <BsArrowUp className="absolute text-btngreen font-semibold"/>
                </div>
                <h2 className="font-bold text-[30px] text-gray20">+301.97k</h2>
            </div>
            <p className="pt-4 pb-4 font-normal text-sm">Last <span className="font-bold">7 days</span> Follower Growth</p>
            <p className="font-normal text-sm opacity-40"><span className="font-bold">23.12</span>% increase from last week</p>
        </div>
        <div className="shadow-stats rounded-lg p-4 w-64">
            <div className="flex gap-[10px]">
                <div className="rounded-[50%] bg-bgiconred p-3 relative w-10 h-10">
                    <BsArrowDown className="absolute text-btnred font-semibold"/>
                </div>
                <h2 className="font-bold text-[30px] text-gray20">-501.97k</h2>
            </div>
            <p className="pt-4 pb-4 font-normal text-sm">Last <span className="font-bold">30 days</span> Follower Growth</p>
            <p className="font-normal text-sm opacity-40"><span className="font-bold">23.12</span>% increase from last week</p>
        </div>
        <div className="shadow-stats rounded-lg p-4 w-64">
            <div className="flex gap-[10px]">
                <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10">
                    <BsArrowUp className="absolute text-btngreen font-semibold"/>
                </div>
                <h2 className="font-bold text-[30px] text-gray20">+124.97k</h2>
            </div>
            <p className="pt-4 pb-4 font-normal text-sm">Total Interactions</p>
        </div>
    </div>
    </>
  )
}

export default StatsCard