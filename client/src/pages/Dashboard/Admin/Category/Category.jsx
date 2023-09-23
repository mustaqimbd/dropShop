import AddCategory from "./addCategory/AddCategory";
import CategoryList from "./allCategories/AllCategoryList";
import AddProperty from "./addProperty/AddProperty";

const Category = () => {
  return (
    <div className="flex gap-10 justify-start">
      <div className=" flex-1 space-y-4">
        <div className="flex-1">
          <AddCategory />
        </div>
        <div className="flex-1">
          <CategoryList />
        </div>
      </div>
      <div className="flex-1">
        <AddProperty />
      </div>
    </div>
  );
};

export default Category;
