const argv = require("minimist")(process.argv.slice(2));
const { blend } = require("./blender.service");
const { getCatImage } = require("./cataas.service");

(async () => {
    const {
        greeting = "Hello",
        who = "You",
        width = 400,
        height = 500,
        color = "Pink",
        size = 100,
    } = argv;

    try {
        const firstImagePromise = getCatImage(
            greeting,
            width,
            height,
            color,
            size
        );
        const secondImagePromise = getCatImage(who, width, height, color, size);

        const [firstBody, secondBody] = await Promise.all([
            firstImagePromise,
            secondImagePromise,
        ]);

        await blend(firstBody, secondBody, width, height);
    } catch (err) {
        console.log(err);
        // todo: log error
    }
})();
