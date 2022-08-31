const request = require("request");

const cataasApiHostPrefix = "https://cataas.com/cat/says";
const imageEncoding = "binary";

/**
 * Sends request to CataaS API to return an image of a cat
 * @param {string} greeting - Greeting message to be shown on the image
 * @param {number} width - width of the image to be return
 * @param {number} height - height of the image to be returned
 * @param {string} color - color of the text on the image
 * @param {number} size - font size of the text
 */
const getCatImage = (greeting, width, height, color, size) =>
    new Promise((resolve, reject) => {
        const requestObject = {
            url: `${cataasApiHostPrefix}/${greeting}`,
            qs: {
                width,
                height,
                color,
                s: size,
                encoding: imageEncoding,
            },
        };

        request(requestObject, (err, res, body) => {
            if (err) {
                reject(err);
            }

            console.log("Received response with status:" + res.statusCode);
            resolve(body);
        });
    });

module.exports = { getCatImage };
