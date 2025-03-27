import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/avatar.svg";

export default function SearchBox({ arrayOfObject = [] }) {
  const [search, setSearch] = useState("");

  const filteredItems = arrayOfObject.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // for handling image error
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-none rounded-lg p-2 text-sm w-48 md:w-auto bg-tertiary text-tertiary focus:outline-none focus:bg-primary placeholder:text-secondary"
      />

      {/* Dropdown */}
      {search && (
        <ul className="w-96 absolute right-0 mt-1 bg-primary rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="flex items-center p-2 cursor-pointer hover:bg-secondary"
                  target="_blank"
                >
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 flex justify-center items-center rounded-full mr-2 bg-secondary">
                      <h3 className="font-semibold text-primary text-desc-size">
                        {item.id}
                      </h3>
                    </div>
                  )}

                  <div>
                    <div className="font-semibold text-primary">
                      {item.name}
                    </div>
                    <div className="text-sm text-secondary">{item.desc}</div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-2 text-secondary">No data found!</li>
          )}
        </ul>
      )}
    </div>
  );
}

SearchBox.propTypes = {
  arrayOfObject: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
