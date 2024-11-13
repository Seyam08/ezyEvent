import PropTypes from "prop-types";

export default function PageHeading({ children, customClass }) {
  return (
    <h1 className={`text-primary text-2xl font-semibold ${customClass}`}>
      {children}
    </h1>
  );
}
PageHeading.propTypes = {
  children: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};
