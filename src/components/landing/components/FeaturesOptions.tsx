import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const featuresConfig = {
  mvp: [
      "Battle tested systems that are ready to scale",
      "Flexible Partnership Models",
      "Consulting on go-to-market and growth strategy",
    ],
  supercharged: ["Option 1", "Option 2", "Option 3"],
  control: ["Option 1", "Option 2", "Option 3"],
};

function FeaturesOptions({ mode = "mvp", title, subtitle }) {
  const content = featuresConfig[mode] || featuresConfig.mvp;

  const fadeVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-card border p-6 flex flex-col justify-between text-title h-[408px] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode} // triggers animation when mode changes
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-around justify-between w-full">
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <div className="w-16 h-16 flex items-center justify-center z-10">
              <img
                src={"/Frame.png"}
                alt="spark/co"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="w-3/4">
            <p className="mb-6 text-xl ">{subtitle}</p>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              {content.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-xl">
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
}

export default FeaturesOptions;
