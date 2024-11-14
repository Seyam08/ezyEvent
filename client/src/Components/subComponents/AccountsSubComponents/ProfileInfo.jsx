import PropTypes from "prop-types";

export default function ProfileInfo({ title, info }) {
  return (
    <div>
      <p className="font-medium text-tertiary">{title}</p>
      <p className="text-secondary font-medium">{info}</p>
    </div>
  );
}
ProfileInfo.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
};
