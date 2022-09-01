const _blend = require("@mapbox/blend");
let { writeFile } = require("fs");
let { join } = require("path");

const fileName = "cat-card.jpg";
const encodingType = "binary";

/**
 * Blend two images together
 * @param firstImage - body of first image
 * @param secondImage - body of second image
 * @param {number} width - width of output image
 * @param {number} height - height of output image
 * @param {string} format - format of the output image
 * @returns
 */
const blend = (firstImage, secondImage, width, height, format = "jpeg") => {
    return new Promise((resolve, reject) => {
        _blend(
            [
                { buffer: Buffer.from(firstImage, encodingType), x: 0, y: 0 },
                {
                    buffer: Buffer.from(secondImage, encodingType),
                    x: width,
                    y: 0,
                },
            ],
            { width, height, format },
            (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                const fileOut = join(process.cwd(), `/${fileName}`);

                writeFile(fileOut, data, encodingType, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log("The file was saved!");
                    resolve(true);
                });
            }
        );
    });
};

module.exports = { blend };
