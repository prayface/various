//* 三角形配置
export default {
    triangle: {
        top_end: {
            top: "auto",
            left: "auto",
            right: "8px",
            bottom: "1px",
            transform: `translate(0, 100%) rotate(90deg)`,
        },
        top_start: {
            top: "auto",
            left: "8px",
            right: "auto",
            bottom: "1px",
            transform: `translate(0, 100%) rotate(90deg)`,
        },
        top_center: {
            top: "auto",
            left: "50%",
            right: "auto",
            bottom: "1px",
            transform: `translate(-50%, 100%) rotate(90deg)`,
        },
        left_end: {
            top: "auto",
            left: "auto",
            right: "0",
            bottom: "8px",
            transform: `translate(100%, 0) rotate(0)`,
        },
        left_start: {
            top: "8px",
            left: "auto",
            right: "0",
            bottom: "auto",
            transform: `translate(100%, 0) rotate(0)`,
        },
        left_center: {
            top: "50%",
            left: "auto",
            right: "0",
            bottom: "auto",
            transform: `translate(100%, -50%) rotate(0)`,
        },
        right_end: {
            top: "auto",
            left: "0",
            right: "auto",
            bottom: "8px",
            transform: `translate(-100%, 0) rotate(180deg)`,
        },
        right_start: {
            top: "8px",
            left: "0",
            right: "auto",
            bottom: "auto",
            transform: `translate(-100%, 0) rotate(180deg)`,
        },
        right_center: {
            top: "50%",
            left: "0",
            right: "auto",
            bottom: "auto",
            transform: `translate(-100%, -50%) rotate(180deg)`,
        },
        bottom_end: {
            top: "1px",
            left: "auto",
            right: "8px",
            bottom: "auto",
            transform: `translate(0, -100%) rotate(-90deg)`,
        },
        bottom_start: {
            top: "1px",
            left: "8px",
            right: "auto",
            bottom: "auto",
            transform: `translate(0, -100%) rotate(-90deg)`,
        },
        bottom_center: {
            top: "1px",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: `translate(-50%, -100%) rotate(-90deg)`,
        },
    },
};
