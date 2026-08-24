"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Hero.module.css";

const IMAGES = [
  // { src: "/assets/art-1.png", width: 140, height: 260, startAngle: 2.35 },
  // { src: "/assets/art-3.png", width: 210, height: 175, startAngle: 5.85 },
  // { src: "/assets/art-2.png", width: 280, height: 125, startAngle: 3.75 },
  // { src: "/assets/art-4.png", width: 200, height: 180, startAngle: 0.45 },
  { src: "/brand/logo-blue-green.png", width: 200, height: 180, startAngle: 0.3 },
  { src: "/assets/pointerAsset 2@2x.png", width: 160, height: 160, startAngle: 1.8 },
  { src: "/assets/pointerAsset 6@2x.png", width: 160, height: 160, startAngle: 3.1 },
  { src: "/assets/pointerAsset 7@2x.png", width: 160, height: 160, startAngle: 4.5, outline: true },
  { src: "/assets/pointerAsset 8@2x.png", width: 160, height: 160, startAngle: 5.2 },
  { src: "/assets/pointerAsset 9@2x.png", width: 160, height: 160, startAngle: 0.9 },
];

// rx/ry as fraction of container size — must match the SVG ellipse geometry
const RX_FRAC = 0.387;
const RY_FRAC = 0.374;
const DURATION = 80; // seconds per orbit
const TILT_DURATION = 9; // seconds per half-oscillation
const TILT_MAX = Math.PI / 9; // ~36° max tilt

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ellipseRef = useRef<SVGEllipseElement>(null);
  const progressRef = useRef({ value: 0 });
  const tiltRef = useRef({ value: -TILT_MAX });
  const sizeScaleRef = useRef(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const progress = progressRef.current;
    const tilt = tiltRef.current;
    let w = container.offsetWidth;
    let h = container.offsetHeight;

    const updateSize = () => {
      w = container.offsetWidth;
      h = container.offsetHeight;
      sizeScaleRef.current = Math.min(1, w / 900);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const tiltTween = gsap.to(tilt, {
      value: TILT_MAX,
      duration: TILT_DURATION,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const orbitTween = gsap.to(progress, {
      value: Math.PI * 2,
      duration: DURATION,
      ease: "none",
      repeat: -1,
      onUpdate() {
        const cosT = Math.cos(tilt.value);
        const rx = w * RX_FRAC;
        const ry = h * RY_FRAC;

        // Update SVG ellipse ry to match the 3D tilt
        if (ellipseRef.current) {
          ellipseRef.current.setAttribute(
            "ry",
            String(Math.abs(cosT) * RY_FRAC * 800)
          );
        }

        const ss = sizeScaleRef.current;
        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          const imgW = IMAGES[i].width * ss;
          const imgH = (IMAGES[i].height / IMAGES[i].width) * imgW;
          const angle = progress.value + IMAGES[i].startAngle;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          const x = w / 2 + rx * cosA;
          const y = h / 2 + ry * sinA * cosT;
          // sinA > 0 = bottom/front, sinA < 0 = top/back
          const depthScale = 1 + 0.3 * sinA;
          gsap.set(el, {
            width: imgW,
            x: x - (imgW * depthScale) / 2,
            y: y - (imgH * depthScale) / 2,
            scale: depthScale,
            zIndex: sinA > 0 ? 4 : 2,
          });
        });
      },
    });

    return () => {
      orbitTween.kill();
      tiltTween.kill();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Oval drawn to match the JS orbit radii */}
      <svg
        className={styles.oval}
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <ellipse
          ref={ellipseRef}
          cx="500"
          cy="400"
          rx={RX_FRAC * 1000}
          ry={RY_FRAC * 800}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className={styles.centerContent}>
        <Image
          src="/brand/logo-monochrome-stacked.png"
          alt="PCD 2026"
          width={660}
          height={380}
          priority
          className={styles.centerLogo}
        />
      </div>

      {IMAGES.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          className={`${styles.orbitImg}${img.outline ? " outline" : ""}`}
        >
          <Image
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
          />
        </div>
      ))}
    </section>
  );
}
