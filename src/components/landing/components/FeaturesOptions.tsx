import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FeaturesOptions = ({
  mode = "mvp",
  title,
  subtitle,
  featuresConfig,
}) => {
  const content = featuresConfig[mode] || featuresConfig.mvp;

  const fadeVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-card border p-6 flex flex-col justify-between text-title h-full w-[540px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode} // triggers animation when mode changes
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-around justify-left w-full gap-2">
              <img
                src={"/Frame.png"}
                alt="spark/co"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain cursor-pointer"
              />
            <h3 className="sm:text-xl md:text-lg font-bold">{title}</h3>
          </div>
          <div className="w-3/4 text-lg mt-4 flex flex-col gap-4 ">
            <p>{subtitle}</p>
            <ul className="space-y-4 leading-relaxed">
              {content.map((feat) => (
                <li key={feat} className="flex items-start gap-1 ">
                  <ArrowRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FeaturesOptions;
