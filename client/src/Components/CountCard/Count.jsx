import PropTypes from "prop-types";
import useCounter from "../../hooks/useCounter";

export default function Count({ limit }) {
  const count = useCounter(limit);
  return <h2 className="font-bold text-primary text-heading-size">{count}+</h2>;
}
Count.propTypes = {
  limit: PropTypes.number.isRequired,
};
