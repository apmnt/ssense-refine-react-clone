import React, { useState, useRef } from "react";

const FilterComponent = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visibleOptions, setVisibleOptions] = useState("designer");
  const designerSectionsRef = useRef(null);

  const designers = [
    "032c",
    "1017 ALYX 9SM",
    "11 by Boris Bidjan Saberi",
    "132 5. ISSEY MIYAKE",
    "16Arlington",
    "66°North",
    "73 LONDON",
    "99%IS-",
    "_J.L - A.L_",
    "A-COLD-WALL*",
    "A.FOUR LABS",
    "A.P.C.",
    "A.W.A.K.E. Mode",
    "A_COLD_WALL*",
    "A_COLD_WALL* X Diesel",
    "A_COLD_WALL* X Diesel Red Tag",
    "A_COLD_WALL* X Nike",
    "Issey Miyake",
    "Junya Watanabe",
    "Kiko Kostadinov",
    "Lemaire",
    "Maison Margiela",
    "Rick Owens",
  ];
  const categories = ["ACCESSORIES", "BAGS", "CLOTHING", "SHOES"];
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const handleOptionClick = (option) => {
    setVisibleOptions(option);
  };

  const handleLetterClick = (letter) => {
    const element = document.getElementById(`designer-section-${letter}`);
    const stickyHeader = document.querySelector(".sticky-header");
    if (element && stickyHeader) {
      const stickyHeaderHeight = stickyHeader.offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - stickyHeaderHeight,
        behavior: "smooth",
      });
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const getDesignerSections = () => {
    const sections = {};
    designers.forEach((designer) => {
      const firstLetter = designer[0].toUpperCase();
      if (!sections[firstLetter]) {
        sections[firstLetter] = [];
      }
      sections[firstLetter].push(designer);
    });
    return sections;
  };

  const designerSections = getDesignerSections();

  const getFilterObject = () => {
    const filterObject = {};
    selectedFilters.forEach((filter) => {
      if (designers.includes(filter)) {
        if (!filterObject.designers) {
          filterObject.designers = [];
        }
        filterObject.designers.push(filter);
      } else if (categories.includes(filter)) {
        if (!filterObject.categories) {
          filterObject.categories = [];
        }
        filterObject.categories.push(filter);
      } else if (sizes.includes(filter)) {
        if (!filterObject.sizes) {
          filterObject.sizes = [];
        }
        filterObject.sizes.push(filter);
      }
    });
    return filterObject;
  };

  const handleApplyFilters = () => {
    const filterObject = getFilterObject();
    console.log(filterObject);
  };

  return (
    <div className="filter-component">
      <div className="sticky-header">
        <div className="filter-header">
          <button className="cancel-button">CANCEL</button>
        </div>
        <div className="selected-filters">
          {selectedFilters.length === 0 ? (
            <div className="select-filter-text">SELECT A FILTER</div>
          ) : (
            <>
              <button className="clear-button" onClick={clearFilters}>
                CLEAR
              </button>
              <div className="filter-box-container">
                {selectedFilters.map((filter) => (
                  <div key={filter} className="filter-box">
                    <span className="filter-name">{filter}</span>
                    <span
                      className="remove-filter"
                      onClick={() => removeFilter(filter)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="filter-buttons">
          <button
            onClick={() => handleOptionClick("designer")}
            className={visibleOptions === "designer" ? "selected" : ""}
          >
            DESIGNERS
          </button>
          <button
            onClick={() => handleOptionClick("category")}
            className={visibleOptions === "category" ? "selected" : ""}
          >
            CATEGORIES
          </button>
          <button
            onClick={() => handleOptionClick("size")}
            className={visibleOptions === "size" ? "selected" : ""}
          >
            SIZE
          </button>
        </div>
      </div>
      <div className="filter-options">
        {visibleOptions === "designer" && (
          <div className="designer-sections">
            {Object.entries(designerSections).map(([letter, designers]) => (
              <div
                key={letter}
                className="designer-section"
                id={`designer-section-${letter}`}
              >
                <div className="designer-section-identifier">
                  <span>{letter}</span>
                </div>
                <div className="designer-items">
                  {designers.map((designer) => (
                    <div
                      key={designer}
                      className={`designer-item ${
                        selectedFilters.includes(designer) ? "selected" : ""
                      }`}
                      onClick={() => handleFilterClick(designer)}
                    >
                      <div className="designer-item-indicator">
                        {selectedFilters.includes(designer) && <span>—</span>}
                      </div>
                      <div className="designer-item-name">
                        <span>{designer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {visibleOptions === "category" && (
          <div className="filter-items">
            {categories.map((category) => (
              <div
                key={category}
                className={`filter-item ${
                  selectedFilters.includes(category) ? "selected" : ""
                }`}
                onClick={() => handleFilterClick(category)}
              >
                <div className="filter-item-indicator">
                  {selectedFilters.includes(category) && <span>—</span>}
                </div>
                <div className="filter-item-name">
                  <span>{category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {visibleOptions === "size" && (
          <div className="filter-items">
            {sizes.map((size) => (
              <div
                key={size}
                className={`filter-item ${
                  selectedFilters.includes(size) ? "selected" : ""
                }`}
                onClick={() => handleFilterClick(size)}
              >
                <div className="filter-item-indicator">
                  {selectedFilters.includes(size) && <span>—</span>}
                </div>
                <div className="filter-item-name">
                  <span>{size}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {visibleOptions === "designer" && (
        <div className="rolodex-index__container">
          <div className="rolodex-index">
            {Object.keys(designerSections).map((letter) => (
              <a
                key={letter}
                className="rolodex-index__letter"
                onClick={() => handleLetterClick(letter)}
              >
                <span className="text">{letter}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <button className="apply-filters-button">
        {selectedFilters.length === 0
          ? "VIEW ALL PRODUCTS"
          : `APPLY FILTERS (${selectedFilters.length})`}
      </button>
    </div>
  );
};

export default FilterComponent;
