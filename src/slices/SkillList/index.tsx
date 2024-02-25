"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `SkillList`.
 */
export type SkillListProps = SliceComponentProps<Content.SkillListSlice>;

/**
 * Component for "SkillList" Slices.
 */
const SkillList = ({ slice }: SkillListProps): JSX.Element => {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });
      tl.fromTo(
        ".skill-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(700, 400)
              : gsap.utils.random(-700, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-700, -400)
              : gsap.utils.random(700, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.items.map(({ skill_color, skill_name }, index) => (
        <div
          key={index}
          className="skill-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={skill_name || undefined}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="skill-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 7 && skill_color ? skill_color : "inherit",
                }}
              >
                {skill_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default SkillList;
