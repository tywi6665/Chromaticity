import { TimelineMax as Timeline, Power1 } from "gsap";

const getDefaultTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    const content = node.querSelector("");
    const otherContent = node.querSelector("");

    timeline
        .from(node, 0.3, { display: "none", autoAlpha: 0, delay, ease: Power1.easeIn })
        .from(content, 0.15, { autoAlpha: 0, y: 25, ease: Power1.easeInOut })
        .from(otherContent, 0.15, { autoAlpha: 0, delay: 0.15, ease: Power1.easeIn })

    return timeline;
};