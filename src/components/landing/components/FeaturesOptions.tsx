import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const featuresConfig = {
  default: {
    title: "MVP to Enterprise",
    subtitle: "Guidance and support from just an idea to thousands of users",
    options: [
      "Battle tested systems that are ready to scale",
      "Flexible Partnership Models",
      "Consulting on go-to-market and growth strategy",
    ],
  },
  supercharged: {
    title: "AI Supercharged",
    subtitle: "The perfect balance of human creativity and AI efficiency",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  control: {
    title: "Business Control",
    subtitle:
      "Transparency and clarity that leads to better business decisions",
    options: ["Option 1", "Option 2", "Option 3"],
  },
};

function FeaturesOptions({ mode = "default" }) {
  const content = featuresConfig[mode] || featuresConfig.default;

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
            <h3 className="text-3xl font-bold mb-4">{content.title}</h3>
            <div className="w-16 h-16 flex items-center justify-center z-10">
              <img
                src={"/Frame.png"}
                alt="spark/co"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="w-3/4">
            <p className="mb-6 text-xl ">{content.subtitle}</p>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              {content.options.map((option, index) => (
                <li key={index} className="flex items-start gap-3 text-xl">
                  <ArrowRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  <span>{option}</span>
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
