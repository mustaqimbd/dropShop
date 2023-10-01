import UserInfoTable from "./UserInfoTable";

const Info = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Current store name : </h1>
        <h3 className="text-lg">Your store No : </h3>
        <div className="mt-4">
          <button className="text-[#83B735]">
            Change store name and Payment No
          </button>
        </div>
      </div>
      <div className="mt-10">
        <UserInfoTable />
      </div>
    </div>
  );
};

export default Info;
