
const TrackItem = ({information_name, information}) => {
    return (
        <div className="space-y-2">
        <p className="text-heading font-sans text-base">{information_name}</p>
        <p className="text-heading font-sans text-base">{information}</p>
        </div>
    );
};

export default TrackItem;