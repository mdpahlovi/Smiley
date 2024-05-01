"use client";

import Image from "next/image";
import { useState } from "react";
import type { User } from "@/types";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

export const AnimatedTooltip = ({ items }: { items: User[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0); // going to set this value on mouse move
    // rotate the tooltip
    const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
    // translate the tooltip
    const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
    };

    return (
        <>
            {items.map((item, idx) => (
                <div
                    key={item.name}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    className="-mr-2 relative group flex justify-center"
                >
                    {hoveredIndex === item.id && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.6 }}
                            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 10 } }}
                            exit={{ opacity: 0, y: 20, scale: 0.6 }}
                            style={{ translateX, rotate, whiteSpace: "nowrap" }}
                            className="absolute -top-14 flex flex-col items-center justify-center rounded bg-black z-50 shadow-xl p-1.5"
                        >
                            <div className="font-bold text-white relative z-30 text-xs">{item.name}</div>
                            <div className="text-white text-xs">{item.email.split("@")[0]}</div>
                        </motion.div>
                    )}
                    <Image
                        width={100}
                        height={100}
                        src={item.image}
                        alt={item.name}
                        onMouseMove={handleMouseMove}
                        className="object-cover !m-0 !p-0 object-top rounded-full size-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                    />
                </div>
            ))}
        </>
    );
};
