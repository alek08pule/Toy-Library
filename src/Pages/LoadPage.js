import ListAll from "./Lists/ListAll";
import ListCategory from "./Lists/ListCategory";

const LoadPage = ({ toys, isLoading, isSuccess, isError, categoryItems }) => {
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = toys.length ? (
      <ListAll toys={toys} />
    ) : (
      <ListCategory categoryItems={categoryItems} />
    );
  } else if (isError) {
    content = <p>No item found</p>;
  }

  return <main>{content}</main>;
};

export default LoadPage;
