import ToyCard from "../../Components/ToyCard/ToyCard";
// import "./Lists.css";

const ListCategory = ({ categoryItems }) => {
  console.log("category");
  return (
    <main>
      <div className="listed-searched-items">
        {categoryItems.map((item) => (
          <div key={item.id} className="bbb">
            <ToyCard item={item} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListCategory;
