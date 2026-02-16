export default function ProfileStats() {
    return (
        <></>
        // <div className="flex justify-around py-4 border-b text-center">
        //     <Stat label="Posts" value="15" />
        //     <Stat label="Followers" value="381" />
        //     <Stat label="Following" value="495" />
        // </div>
    )
}


function Stat({ label, value }) {
    return (
        <div>
            <p className="font-semibold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    )
}