import Nav from "../Components/Nav/Nav";
import { useEffect, useState } from "react";
import ListAll from "./Lists/ListAll";
import { Routes, Route } from "react-router-dom";
import LoadPage from "./LoadPage";
import ListCategory from "./Lists/ListCategory";
import Footer from "../Components/Footer";
import { useGetToysQuery } from "../features/ToySlice";

const Library = ({ logo, userId }) => {
  const allCategories = [];
  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttons, setButtons] = useState(allCategories);
  const [categoryItems, setCategoryItem] = useState([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const toggleCart = () => {
  //   setIsCartOpen((prevState) => !prevState);
  // };

  const { data: toysData, isLoading, isSuccess, isError } = useGetToysQuery();

  useEffect(() => {
    if (isSuccess) {
      setToys(toysData);
    }
  }, [toysData, isSuccess]);
  console.log(toys);

  const filterByCategory = (button) => {
    if (button === "All") {
      setCategoryItem(toys);
      return;
    }
    const filteredData = toys.filter((item) => item.Category === button);
    setCategoryItem(filteredData);
    console.log("filterCategory", filteredData);
  };

  useEffect(() => {
    const allCategories = [
      "All",
      ...new Set(toys.map((item) => item.Category)),
    ];
    setButtons(allCategories);
  }, [toys]);
  const handleCategoryClick = (category) => {
    filterByCategory(category);
    setSearchResults([]);
    console.log(categoryItems);
  };
  useEffect(() => {
    console.log("categoryItems", categoryItems);
  }, [categoryItems]);

  useEffect(() => {
    const filteredResults = toys.filter(
      (toys) =>
        toys.Name.toLowerCase().includes(search.toLowerCase()) ||
        toys.Description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [toys, search]);

  return (
    <div className="libraryPage">
      <nav>
        <Nav
          logo={logo}
          buttons={buttons}
          setButtons={setButtons}
          search={search}
          setSearch={setSearch}
          handleCategoryClick={handleCategoryClick}
          userId={userId}
          // toggleCart={toggleCart}
          // isCartOpen={isCartOpen}
        />
      </nav>
      <main>
        <LoadPage
          toys={searchResults}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          categoryItems={categoryItems}
        />

        <Routes>
          <Route
            path="/List"
            element={<ListAll toys={searchResults} isLoading={isLoading} />}
          />
          <Route
            path="/ListCategory"
            element={<ListCategory categoryItems={categoryItems} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default Library;
