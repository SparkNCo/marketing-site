"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailCapture from "../../../ui/EmailTemplate/EmailInput";
import { cn } from "./utils";

interface Segment {
  id: string;
  name: string;
  shortName: string;
  percentage: number;
  color: string;
  hoverColor: string;
  glowColor: string;
  description: string;
  completionHint: string;
}

const SEGMENTS: Segment[] = [
  {
    id: "design",
    name: "Design / Product Definition",
    shortName: "Design",
    percentage: 14.28,
    color: "#FFFFFF",
    hoverColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.4)",
    description: "Define product vision, requirements, and roadmap",
    completionHint:
      "Design alone sets direction but doesn't ship products. Without development, testing, and deployment, plans remain theoretical.",
  },
  {
    id: "development",
    name: "Development",
    shortName: "Development",
    percentage: 14.28,
    color: "#FDE3D0",
    hoverColor: "#FDE3D0",
    glowColor: "rgba(253, 227, 208, 0.4)",
    description: "Write code and build features",
    completionHint:
      "Development alone is not enough. Without testing, CI/CD, and monitoring, this is only partially complete.",
  },
  {
    id: "testing",
    name: "Testing / QA",
    shortName: "Testing",
    percentage: 14.28,
    color: "#FBC7A1",
    hoverColor: "#FBC7A1",
    glowColor: "rgba(251, 199, 161, 0.4)",
    description: "Ensure quality through automated and manual testing",
    completionHint:
      "Testing validates code but can't verify production behavior. Real-world issues surface in deployment and monitoring.",
  },
  {
    id: "cicd",
    name: "CI/CD / Deployment",
    shortName: "CI/CD",
    percentage: 14.28,
    color: "#FAAB72",
    hoverColor: "#FAAB72",
    glowColor: "rgba(250, 171, 114, 0.4)",
    description: "Automate building, testing, and deploying",
    completionHint:
      "CI/CD automates delivery but without monitoring, you're flying blind. Deployment is just the beginning.",
  },
  {
    id: "monitoring",
    name: "Monitoring / Observability",
    shortName: "Monitoring",
    percentage: 14.28,
    color: "#F99550",
    hoverColor: "#F99550",
    glowColor: "rgba(249, 149, 80, 0.4)",
    description: "Track performance, errors, and user behavior",
    completionHint:
      "Monitoring reveals issues but without a feedback loop to design, insights don't drive improvement.",
  },
  {
    id: "analysis",
    name: "Analysis / Product Feedback",
    shortName: "Analysis",
    percentage: 14.28,
    color: "#F88A3D",
    hoverColor: "#F88A3D",
    glowColor: "rgba(248, 138, 61, 0.4)",
    description: "Learn from users and continuously improve",
    completionHint:
      "Analysis captures learnings but without governance, changes can introduce risk and technical debt.",
  },
  {
    id: "governance",
    name: "Governance / Reporting",
    shortName: "Governance",
    percentage: 14.32,
    color: "#F78035",
    hoverColor: "#F78035",
    glowColor: "rgba(247, 128, 53, 0.4)",
    description: "Ensure compliance, security, and visibility",
    completionHint:
      "Governance ensures accountability but the full cycle depends on all phases working together.",
  },
];

const SIZE = 320;
const STROKE_WIDTH = 44;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const LABEL_RADIUS = RADIUS + STROKE_WIDTH / 2 + 90; // Distance from center for labels

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

const INNER_RADIUS = RADIUS - STROKE_WIDTH / 2;
const OUTER_RADIUS = RADIUS + STROKE_WIDTH / 2;
const CHEVRON_DEPTH = 12; // How deep the chevron point goes

function describeChevronSegment(
  centerX: number,
  centerY: number,
  startAngle: number,
  endAngle: number,
) {
  // Calculate the angle offset for the chevron point
  const chevronAngleOffset = (CHEVRON_DEPTH / RADIUS) * (180 / Math.PI);

  // Extend start angle backward to fill under the previous segment's chevron
  const adjustedStartAngle = startAngle - chevronAngleOffset;

  // Points for the back edge (receives previous chevron)
  const outerBackStart = polarToCartesian(
    centerX,
    centerY,
    OUTER_RADIUS,
    adjustedStartAngle,
  );
  const innerBackStart = polarToCartesian(
    centerX,
    centerY,
    INNER_RADIUS,
    adjustedStartAngle,
  );
  const backChevronTip = polarToCartesian(centerX, centerY, RADIUS, startAngle);

  // Points for the front edge (chevron pointing forward)
  const outerEnd = polarToCartesian(
    centerX,
    centerY,
    OUTER_RADIUS,
    endAngle - chevronAngleOffset,
  );
  const innerEnd = polarToCartesian(
    centerX,
    centerY,
    INNER_RADIUS,
    endAngle - chevronAngleOffset,
  );
  const frontChevronTip = polarToCartesian(centerX, centerY, RADIUS, endAngle);

  // Determine if we need large arc flag for outer/inner arcs (same sweep angle)
  const sweepAngle = endAngle - chevronAngleOffset - adjustedStartAngle;
  const outerLargeArcFlag = sweepAngle > 180 ? "1" : "0";
  const innerLargeArcFlag = outerLargeArcFlag;

  // All segments: chevron notch at back, chevron point at front
  return [
    "M",
    outerBackStart.x,
    outerBackStart.y,
    "A",
    OUTER_RADIUS,
    OUTER_RADIUS,
    0,
    outerLargeArcFlag,
    1,
    outerEnd.x,
    outerEnd.y,
    "L",
    frontChevronTip.x,
    frontChevronTip.y,
    "L",
    innerEnd.x,
    innerEnd.y,
    "A",
    INNER_RADIUS,
    INNER_RADIUS,
    0,
    innerLargeArcFlag,
    0,
    innerBackStart.x,
    innerBackStart.y,
    "L",
    backChevronTip.x,
    backChevronTip.y,
    "Z",
  ].join(" ");
}

interface SegmentArcProps {
  segment: Segment;
  startAngle: number;
  endAngle: number;
  isSelected: boolean;
  isHovered: boolean;
  isComplete: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hasAnySelection: boolean;
}

function SegmentArc({
  segment,
  startAngle,
  endAngle,
  isSelected,
  isHovered,
  isComplete,
  onClick,
  onMouseEnter,
  onMouseLeave,
  hasAnySelection,
}: Readonly<SegmentArcProps>) {
  const center = SIZE / 2;
  const path = describeChevronSegment(center, center, startAngle, endAngle);

  const shouldPulse = hasAnySelection && !isSelected && !isComplete;
  const isActiveSegment = isComplete || isSelected;

  let animatedOpacity: number | number[];
  if (isActiveSegment) {
    animatedOpacity = 1;
  } else if (shouldPulse) {
    animatedOpacity = [0.15, 0.3, 0.15];
  } else {
    animatedOpacity = 0.15;
  }

  let animatedFill: string;
  if (isActiveSegment) {
    animatedFill = segment.color;
  } else if (isHovered) {
    animatedFill = segment.hoverColor;
  } else {
    animatedFill = "rgba(255,255,255,0.1)";
  }

  const animatedScale = isHovered && !isComplete ? 1.02 : 1;

  return (
    <motion.path
      d={path}
      fill={isActiveSegment ? segment.color : "rgba(255,255,255,0.1)"}
      stroke="none"
      style={{
        cursor: isComplete ? "default" : "pointer",
      }}
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: animatedOpacity,
        scale: animatedScale,
        fill: animatedFill,
      }}
      transition={{
        opacity: shouldPulse
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 },
        scale: { duration: 0.2 },
        fill: { duration: 0.3 },
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

interface TooltipProps {
  segment: Segment;
  isSelected: boolean;
  position: { x: number; y: number };
}

function Tooltip({ segment, isSelected, position }: Readonly<TooltipProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-50 w-72 rounded-lg border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-sm"
      style={{
        left: position.x > SIZE / 2 ? "auto" : "calc(100% + 20px)",
        right: position.x > SIZE / 2 ? "calc(100% + 20px)" : "auto",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: segment.color }}
        />
        <h4 className="font-semibold text-foreground">{segment.name}</h4>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        {segment.description}
      </p>
      {isSelected && (
        <>
          <div className="mb-2 border-t border-border pt-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {segment.completionHint}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded bg-secondary/50 px-2 py-1">
            <span className="text-xs text-muted-foreground">Completion:</span>
            <span className="text-sm font-medium text-primary">30–40%</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

function EnergyRing() {
  return (
    <motion.circle
      cx={SIZE / 2}
      cy={SIZE / 2}
      r={RADIUS}
      fill="none"
      stroke="url(#energyGradient)"
      strokeWidth={2}
      strokeDasharray="10 20"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
  );
}

type SDLCDonutChartProps = {
  setMode?: (mode: "index" | "form") => void;
};

export function SDLCDonutChart({ setMode }: Readonly<SDLCDonutChartProps>) {
  const [selectedSegments, setSelectedSegments] = useState<Set<string>>(
    new Set(),
  );
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [isComplete] = useState(false);
  const [completingIndex] = useState(-1);

  const completionPercentage = useMemo(() => {
    if (isComplete) return 100;
    return Math.round((selectedSegments.size / SEGMENTS.length) * 100);
  }, [selectedSegments.size, isComplete]);

  const hasAnySelection = selectedSegments.size > 0;

  const toggleSegment = useCallback(
    (id: string) => {
      if (isComplete) return;
      setSelectedSegments((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [isComplete],
  );

  // Calculate segment angles
  const segmentAngles = useMemo(() => {
    let currentAngle = 0;
    return SEGMENTS.map((segment) => {
      const startAngle = currentAngle;
      const sweepAngle = (segment.percentage / 100) * 360;
      currentAngle += sweepAngle;
      return { startAngle, endAngle: startAngle + sweepAngle };
    });
  }, []);

  const hoveredSegmentData = hoveredSegment
    ? SEGMENTS.find((s) => s.id === hoveredSegment)
    : null;
  const hoveredAngle = hoveredSegment
    ? segmentAngles[SEGMENTS.findIndex((s) => s.id === hoveredSegment)]
    : null;
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-8",
        "lg:flex-row lg:items-center lg:justify-center lg:gap-10",
      )}
    >
      <div className="flex w-full flex-col items-center gap-6 overflow-hidden lg:w-fit lg:overflow-visible">
        <div className="-mb-[250px] origin-top md:mb-0 scale-75 md:scale-100">
          <div
            className="relative"
            style={{
              width: SIZE + LABEL_RADIUS * 2,
              height: SIZE + LABEL_RADIUS * 2,
            }}
          >
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute drop-shadow-2xl"
              style={{ left: LABEL_RADIUS, top: LABEL_RADIUS }}
            >
              <defs>
                <linearGradient
                  id="energyGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F99550" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F78035" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Energy ring for complete state */}
              {isComplete && <EnergyRing />}

              {/* Segments */}
              {SEGMENTS.map((segment, index) => (
                <SegmentArc
                  key={segment.id}
                  segment={segment}
                  startAngle={segmentAngles[index].startAngle}
                  endAngle={segmentAngles[index].endAngle}
                  isSelected={selectedSegments.has(segment.id)}
                  isHovered={hoveredSegment === segment.id}
                  isComplete={isComplete || completingIndex >= index}
                  onClick={() => toggleSegment(segment.id)}
                  onMouseEnter={() => setHoveredSegment(segment.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  hasAnySelection={hasAnySelection}
                />
              ))}
            </svg>

            {/* Center Text */}
            <div
              className="absolute flex flex-col items-center justify-center "
              style={{
                left: LABEL_RADIUS,
                top: LABEL_RADIUS,
                width: SIZE,
                height: SIZE,
              }}
            >
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center text-center"
                  >
                    <span
                      className="text-4xl font-bold"
                      style={{
                        color: "#F78035",
                        textShadow: "0 0 20px rgba(247, 128, 53, 0.5)",
                      }}
                    >
                      100%
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      System Complete
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Ready to Launch
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="text-4xl font-bold text-foreground">
                      {completionPercentage}%
                    </span>
                    <span className="max-w-[120px] text-xs text-foreground">
                      {hasAnySelection
                        ? "Ready for Launch"
                        : "How complete is your tech stack?"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredSegmentData && hoveredAngle && (
                <Tooltip
                  segment={hoveredSegmentData}
                  isSelected={selectedSegments.has(hoveredSegmentData.id)}
                  position={{
                    x:
                      SIZE / 2 +
                      RADIUS *
                        Math.cos(
                          (((hoveredAngle.startAngle + hoveredAngle.endAngle) /
                            2 -
                            90) *
                            Math.PI) /
                            180,
                        ),
                    y:
                      SIZE / 2 +
                      RADIUS *
                        Math.sin(
                          (((hoveredAngle.startAngle + hoveredAngle.endAngle) /
                            2 -
                            90) *
                            Math.PI) /
                            180,
                        ),
                  }}
                />
              )}
            </AnimatePresence>

            {/* Radial labels — md+ only (positioned around chart) */}
            <div
              className="absolute inset-0 hidden md:block lg:scale-100"
              style={{ pointerEvents: "none" }}
            >
              {SEGMENTS.map((segment, index) => {
                const midAngle =
                  (segmentAngles[index].startAngle +
                    segmentAngles[index].endAngle) /
                  2;
                const angleRad = ((midAngle - 90) * Math.PI) / 180;
                const labelX =
                  (SIZE + LABEL_RADIUS * 2) / 2 +
                  LABEL_RADIUS * Math.cos(angleRad);
                const labelY =
                  (SIZE + LABEL_RADIUS * 2) / 2 +
                  LABEL_RADIUS * Math.sin(angleRad);

                return (
                  <button
                    key={segment.id}
                    type="button"
                    onClick={() => toggleSegment(segment.id)}
                    className={cn(
                      "absolute flex items-center gap-3 border px-[18px] py-[9px] text-lg font-medium transition-all whitespace-nowrap pointer-events-auto lg:gap-2 lg:px-3 lg:py-1.5 lg:text-body",
                      selectedSegments.has(segment.id) || isComplete
                        ? "border-donut bg-secondary/50 text-foreground"
                        : "border-donut bg-transparent text-foreground hover:border-muted-foreground",
                    )}
                    style={{
                      left: labelX,
                      top: labelY,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          selectedSegments.has(segment.id) || isComplete
                            ? segment.color
                            : "rgba(255,255,255,0.3)",
                      }}
                    />
                    {segment.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* end scale wrapper */}

        {/* Below md: same controls under chart, flex-wrapped and centered */}
        <div className="relative z-10 -mt-28 flex w-full max-w-md flex-wrap justify-center gap-2 px-3 md:hidden">
          {SEGMENTS.map((segment) => (
            <button
              key={`mobile-${segment.id}`}
              type="button"
              onClick={() => toggleSegment(segment.id)}
              className={cn(
                "flex items-center gap-2 border px-3 py-2 text-smalltext font-medium transition-all",
                selectedSegments.has(segment.id) || isComplete
                  ? "border-donut bg-secondary/50 text-foreground"
                  : "border-donut bg-transparent text-foreground hover:border-muted-foreground",
              )}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    selectedSegments.has(segment.id) || isComplete
                      ? segment.color
                      : "rgba(255,255,255,0.3)",
                }}
              />
              {segment.shortName}
            </button>
          ))}
        </div>

        {/* <AnimatePresence>
          {hasAnySelection && !isComplete && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-foreground"
            >
              Most teams stop here
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button
          onClick={isComplete ? resetSystem : completeSystem}
          className={cn(
            "relative overflow-hidden px-8 py-3 font-semibold transition-all",
            isComplete
              ? "bg-secondary text-foreground hover:bg-secondary/80"
              : "bg-primary text-primary-foreground hover:brightness-110",
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {!isComplete && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
          <span className="relative">
            {isComplete ? "Reset System" : "Complete the System"}
          </span>
        </motion.button> */}
      </div>

      {/* Below chart below 1024px; to the right of chart at lg+ */}
      <div
        className={cn(
          "flex w-full max-w-xl flex-col gap-4 px-4 text-center",
          "items-center",
          "lg:max-w-none lg:w-2/5 lg:items-start lg:px-0 lg:pr-8 lg:text-left",
        )}
      >
        <h2 className="text-largeBody md:text-heading1 text-foreground">
          Ready for launch?
        </h2>
        <p className="text-body md:text-heading2 text-foreground mb-4">
          Prototypes and MVPs have never been easier, but are you ready for the
          next step? Sign up with Spark &amp; Co and close the gap.
        </p>
        <EmailCapture
          containerClassName="w-full max-w-xl items-center lg:items-start"
          inputWrapperClassName="w-[260px] max-w-full sm:w-[320px] md:w-[378px]"
          buttonClassName="w-[130px] h-[60px] self-center lg:self-start text-background bg-foreground"
          onValidSubmit={() => setMode?.("form")}
        />
      </div>
    </div>
  );
}
