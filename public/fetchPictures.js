const fs = require("fs");
const path = require("path");
const axios = require("axios");

// URL to fetch champion data
const championDataUrl = "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json";

// Fetch champion data
axios.get(championDataUrl)
    .then(response => {
        const champions = response.data.data;
        const champInfoArray = [];

        // Create the directory if it doesn't exist
        const directory = path.join(__dirname, "public", "champInfo");
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // Download champion images and construct the array
        const downloadPromises = Object.keys(champions).map(championName => {
            const imageFileName = champions[championName].image.full;
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${imageFileName}`;
            const imagePath = path.join(directory, imageFileName);

            return axios({
                method: "get",
                url: imageUrl,
                responseType: "stream"
            }).then(response => {
                // Save the image
                return new Promise((resolve, reject) => {
                    const writer = fs.createWriteStream(imagePath);
                    response.data.pipe(writer);
                    writer.on("finish", resolve);
                    writer.on("error", reject);
                });
            }).then(() => {
                // Push champion info to the array
                champInfoArray.push({
                    name: championName,
                    image: `/champInfo/${imageFileName}`
                });
            });
        });

        // Wait for all downloads to finish
        return Promise.all(downloadPromises).then(() => {
            // Write the output JSON file
            const outputFilePath = path.join(__dirname, "champInfo.json");
            fs.writeFileSync(outputFilePath, JSON.stringify(champInfoArray, null, 2));
            console.log("Champion images downloaded and info saved to champInfo.json");
        });
    })
    .catch(error => {
        console.error("Error fetching champion data:", error);
    });
