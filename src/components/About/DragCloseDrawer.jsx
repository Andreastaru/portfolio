import { useEffect } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";

const DragCloseDrawer = ({ open, setOpen, children, picture }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");

      const preventDefault = (e) => {
        if (!drawerRef.current.contains(e.target)) {
          e.preventDefault();
        }
      };

      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      return () => {
        document.removeEventListener("touchmove", preventDefault);
        document.body.classList.remove("no-scroll");
      };
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open, drawerRef]);

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900 flex flex-col items-center justify-center text-center"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div
              className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4 cursor-grab touch-none "
              onPointerDown={(e) => {
                controls.start(e);
              }}
            >
              <button className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 flex flex-col lg:flex-row items-center justify-start scrollable-hidden custom-navbar-padding">
              <img
                src={localStorage.getItem(picture) || picture}
                onLoad={(e) => localStorage.setItem(picture, e.target.src)}
                alt="Description of the ima"
                className="hidden lg:block mb-4 lg:mb-0 lg:mr-4"
                width={300}
                height={300}
              />

              <div className="flex-grow overflow-y-auto scrollable-hidden custom-padding-top custom-padding-bottom">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

DragCloseDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  picture: PropTypes.string.isRequired,
};

export default DragCloseDrawer;
