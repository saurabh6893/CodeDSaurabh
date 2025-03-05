import {
  forwardRef,
  JSX,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import "intl-segmenter-polyfill";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: (string | { text: string; icon?: JSX.Element })[];
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts = [],
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    if (!Array.isArray(texts)) {
      console.error(
        "❌ RotatingText expects 'texts' to be an array of strings or objects."
      );
      return null;
    }

    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    // 🔹 Move to next text
    const next = useCallback(() => {
      setCurrentTextIndex((prevIndex) => {
        const newIndex =
          prevIndex + 1 >= texts.length
            ? loop
              ? 0
              : prevIndex
            : prevIndex + 1;
        onNext?.(newIndex);
        return newIndex;
      });
    }, [texts.length, loop, onNext]);

    // 🔹 Move to previous text
    const previous = useCallback(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex - 1 < 0
          ? loop
            ? texts.length - 1
            : prevIndex
          : prevIndex - 1
      );
    }, [texts.length, loop]);

    // 🔹 Jump to a specific text index
    const jumpTo = useCallback(
      (index: number) => {
        if (index >= 0 && index < texts.length) {
          setCurrentTextIndex(index);
        }
      },
      [texts.length]
    );

    // 🔹 Reset to first text
    const reset = useCallback(() => {
      setCurrentTextIndex(0);
    }, []);

    // 🔹 Handle automatic rotation if `auto` is true
    useEffect(() => {
      if (!auto) return;
      const interval = setInterval(() => next(), rotationInterval);
      return () => clearInterval(interval);
    }, [auto, next, rotationInterval]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }));

    // Extract text and icon safely
    const currentItem = texts[currentTextIndex];
    const currentText =
      typeof currentItem === "string" ? currentItem : currentItem.text;
    const currentIcon =
      typeof currentItem === "object" && currentItem.icon
        ? currentItem.icon
        : null;

    // Function to split text safely
    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new (Intl as any).Segmenter("en", {
          granularity: "grapheme",
        });
        return Array.from(
          segmenter.segment(text),
          (segment: any) => segment.segment
        );
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      return {
        words: currentText.split(" ").map((word, i) => ({
          characters:
            splitBy === "characters" ? splitIntoCharacters(word) : [word],
          needsSpace: i !== currentText.split(" ").length - 1,
        })),
      };
    }, [currentText, splitBy]);

    return (
      <motion.span className={cn("flex items-center", mainClassName)} {...rest}>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.div
            key={currentTextIndex}
            className="flex items-center"
            layout
          >
            {elements.words.map((wordObj, wordIndex) => (
              <span
                key={wordIndex}
                className={cn("inline-flex", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="whitespace-pre"> </span>
                )}
              </span>
            ))}
            {/* Render the icon next to the text */}
            {currentIcon && <span className="ml-2">{currentIcon}</span>}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
