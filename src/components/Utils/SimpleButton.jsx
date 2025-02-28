import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SimpleButton = ({
  text,
  route,
  className,
  disabled,
  type,
  buttonRef,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!type) {
      navigate(route);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={disabled ? {} : { scale: 1.025 }}
      whileTap={disabled ? {} : { scale: 0.975 }}
      onClick={type ? null : handleClick}
      disabled={disabled}
      type={type}
      className={`group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 px-4 py-2 font-mono font-medium text-neutral-300 transition-colors ${
        disabled ? "" : "hover:text-indigo-300 hover:cursor-pointer"
      } custom-navbar-padding ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2">
        <span>{text}</span>
      </div>
      {!disabled && (
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm"
        />
      )}
    </motion.button>
  );
};

SimpleButton.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  buttonRef: PropTypes.object,
};

export default SimpleButton;
