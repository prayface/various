//* 三角形配置
export default {
    triangle: {
        top_end: {
            inset: "auto 8px 1px auto",
            transform: `translate(0, 100%) rotate(90deg)`,
        },
        top_start: {
            inset: "auto auto 1px 8px",
            transform: `translate(0, 100%) rotate(90deg)`,
        },
        top_center: {
            inset: "auto auto 1px 50%",
            transform: `translate(-50%, 100%) rotate(90deg)`,
        },
        left_end: {
            inset: "auto 1px 8px auto",
            transform: `translate(100%, 0) rotate(0)`,
        },
        left_start: {
            inset: "8px 1px auto auto",
            transform: `translate(100%, 0) rotate(0)`,
        },
        left_center: {
            inset: "50% 1px auto auto",
            transform: `translate(100%, -50%) rotate(0)`,
        },
        right_end: {
            inset: "auto auto 8px 1px",
            transform: `translate(-100%, 0) rotate(180deg)`,
        },
        right_start: {
            inset: "8px auto auto 1px",
            transform: `translate(-100%, 0) rotate(180deg)`,
        },
        right_center: {
            inset: "50% auto auto 1px",
            transform: `translate(-100%, -50%) rotate(180deg)`,
        },
        bottom_end: {
            inset: "1px 8px auto auto",
            transform: `translate(0, -100%) rotate(-90deg)`,
        },
        bottom_start: {
            inset: "1px auto auto 8px",
            transform: `translate(0, -100%) rotate(-90deg)`,
        },
        bottom_center: {
            inset: "1px auto auto 50%",
            transform: `translate(-50%, -100%) rotate(-90deg)`,
        },
    },
};
