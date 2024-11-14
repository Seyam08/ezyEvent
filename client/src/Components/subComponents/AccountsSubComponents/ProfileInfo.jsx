import PropTypes from "prop-types";

export default function ProfileInfo({ title, info }) {
  return (
    <div>
      <p className="font-medium text-gray-500">{title}</p>
      <p className="text-gray-900 font-medium">{info}</p>
    </div>
  );
}
ProfileInfo.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
};
