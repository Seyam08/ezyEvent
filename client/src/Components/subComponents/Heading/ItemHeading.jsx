import PropTypes from "prop-types";

export default function ItemHeading({ children }) {
  return <h1 className="text-primary text-xl font-semibold">{children}</h1>;
}
ItemHeading.propTypes = {
  children: PropTypes.string.isRequired,
};
