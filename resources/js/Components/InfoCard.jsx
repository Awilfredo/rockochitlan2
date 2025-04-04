function InfoCard({ svg, value, title, iconBg='bg-indigo-600', onClick=()=>{} }) {
    return (
        <div className="w-full mt-6 sm:w-1/2 xl:w-1/3 sm:px-5">
            <div className="flex items-center px-5 py-6 bg-white hover:bg-gray-50 hover:cursor-pointer rounded-md shadow-sm" onClick={onClick}>
                <div className={"p-3 bg-opacity-75 rounded-full " + iconBg}>
                    {svg}
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                        {value}
                    </h4>
                    <div className="text-gray-500">{title}</div>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;
