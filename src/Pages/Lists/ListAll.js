import "./Lists.css";
import ToyCard from "../../Components/ToyCard/ToyCard";

const ListAll = ({ toys }) => {
  return (
    <main>
      <div className="toy-list">
        {toys.map((toy) => (
          <ToyCard key={toy.id} item={toy} />
        ))}
      </div>
    </main>
  );
};

export default ListAll;
