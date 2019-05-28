import { TimelineMax as Timeline, Power1 } from "gsap";

const getDefaultTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });

    timeline
        .fromTo(node, 0.5, { delay, opacity: 0, ease: Power1.easeIn }, { opacity: 1, ease: Power1.easeOut })

    return timeline;
}

export const play = (pathname, node, appears) => {
    const delay = appears ? 0 : 0.5;
    let timeline;
    timeline = getDefaultTimeline(node, delay);
    if (pathname === "/" || pathname === "/main" || pathname === "/saved") {
        timeline = getDefaultTimeline(node, delay);
    };

    window
        .loadPromise
        .then(() => requestAnimationFrame(() => timeline.play()));
};

export const exit = (node) => {
    const timeline = new Timeline({ paused: true });

    timeline.to(node, 0.5, { opacity: 0, ease: Power1.easeOut })
    timeline.play();
};