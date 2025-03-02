import PropTypes from "prop-types";

export const HowItStarted = ({ paragraph }) => {
  return (
    <p className="h-auto container-without-margin-top rounded-xl text-justify text-sm m-4 pb-10">
      {paragraph}
    </p>
  );
};

HowItStarted.propTypes = {
  paragraph: PropTypes.node.isRequired,
};
