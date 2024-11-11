import PropTypes from "prop-types";

export default function PageHeading({ children }) {
  return <h1 className="text-primary text-2xl font-semibold">{children}</h1>;
}
PageHeading.propTypes = {
  children: PropTypes.string.isRequired,
};
