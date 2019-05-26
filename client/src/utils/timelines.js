import { TimelineMax as Timeline, Power1 } from "gsap";

const getSavedTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    const content = node.querSelector("");
    const otherContent = node.querSelector("");

    timeline
        .from(node, 0.3, { display: "none", autoAlpha: 0, delay, ease: Power1.easeIn })
        .from(content, 0.15, { autoAlpha: 0, y: 25, ease: Power1.easeInOut })
        .from(otherContent, 0.15, { autoAlpha: 0, delay: 0.15, ease: Power1.easeIn })

    return timeline;
};

const getMainTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    const stuff = node.querySelector("");

    timeline
        .from(node, 0 { display: "none", autoAlpha: 0, delay })
        .staggerFrom(stuff, 0.375, { autoAplha: 0, x: -25, ease: Power1.easeOut }, 0.125);

    return timeline;
}

export const play = (pathname, node, appears) => {
    const delay = appears ? 0 : 0.5;
    let timeline;

    if (pathname === "/" || pathname === "/main") {
        timeline = getMainTimeline(node, delay);
    } else {
        timeline = getSavedTimeline(node, delay);
    };

    window
        .loadPromise
        .then(() => requestAnimationFrame(() => timeline.play()));
};

export const exit = (node) => {
    const timeline = new Timeline({ paused: true });

    timeline.to(node, 0.15, { autoAlpha: 0, ease: Power1.easeOut });
    timeline.play();
};