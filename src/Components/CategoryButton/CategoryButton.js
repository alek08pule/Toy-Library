import "./CategoryButton.css";

function CategoryButton({ buttons, handleCategoryClick }) {
  return (
    <div className="category-menu">
      {buttons.map((cat, i) => {
        return (
          <button
            key={i}
            className="categoryBtn"
            type="button"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
export default CategoryButton;
