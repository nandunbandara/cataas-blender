const { writeFile } = require("fs");
const { join } = require("path");
const blend = require("@mapbox/blend");
const argv = require("minimist")(process.argv.slice(2));
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
        console.log("getting images");
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

        blend(
            [
                { buffer: Buffer.from(firstBody, "binary"), x: 0, y: 0 },
                { buffer: Buffer.from(secondBody, "binary"), x: width, y: 0 },
            ],
            { width: width * 2, height: height, format: "jpeg" },
            (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("output data: ", data);
                const fileOut = join(process.cwd(), `/cat-card.jpg`);

                writeFile(fileOut, data, "binary", (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log("The file was saved!");
                });
            }
        );
    } catch (err) {
        console.log(err);
        // todo: log error
    }
})();
