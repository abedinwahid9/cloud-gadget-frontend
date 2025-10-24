"use client";

import React, { MutableRefObject } from "react";
import Image from "next/image";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Thumbnail plugin
function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ProductGallery({ images }: { images: string[] }) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="lg:w-1/2 w-full">
      {/* Main Product Image */}
      <div
        ref={sliderRef}
        className="keen-slider rounded-2xl overflow-hidden bg-white shadow"
      >
        {images?.map((src, i) => (
          <div
            key={i}
            className="keen-slider__slide flex items-center justify-center bg-white"
          >
            <Image
              src={src}
              alt={`Product ${i + 1}`}
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbnailRef}
        className="keen-slider mt-2 thumbnail cursor-pointer p-2"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="keen-slider__slide flex items-center justify-center border rounded-lg bg-white p-2"
          >
            <Image
              src={src}
              alt={`Thumbnail ${i + 1}`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
