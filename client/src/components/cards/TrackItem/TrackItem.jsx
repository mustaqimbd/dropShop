
const TrackItem = ({information_name, information}) => {
    return (
        <div className="space-y-2">
        <div className="text-heading font-sans text-base">{information_name}</div>
        <div className="text-heading font-sans text-base">{information}</div>
        </div>
    );
};

export default TrackItem;