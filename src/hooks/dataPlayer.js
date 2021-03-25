const dataPlayer = (personnalData, name) => {
    const allPoints = [];
    const allTimes = [];

    personnalData.forEach(data => {
        allPoints.push(data.points);
        allTimes.push(data.time);
    });

    const indexOfBestPoints = allPoints.indexOf(Math.max(...allPoints));

    const bestTimeOfBestPoints = allTimes[indexOfBestPoints];

    const minutes = Math.floor(bestTimeOfBestPoints / 60);
    const secondes = bestTimeOfBestPoints - minutes * 60;
    const bestTime = `${minutes}m${secondes}s`;

    const pointsTotal = allPoints.reduce((a, b) => a + b);

    const allLevels = [];
    const allScores = [];

    personnalData.forEach(d => {
        allLevels.push(d.number_of_level);
        allScores.push(d.score);
    });

    const levelsSum = allLevels.reduce((a, b) => a + b);
    const scoresSum = allScores.reduce((a, b) => a + b);
    const percentageTotal = Math.round((scoresSum / levelsSum) * 100); /////DATA

    const getPointsByLocation = (location) => {
        const locationData = personnalData.filter(value => value.location === location);

        if (locationData.length === 0) {
            return [0, 0];
        }

        const points = [];

        locationData.forEach(data => {
            points.push(data.points);
        });

        const pointsLocation = points.reduce((a, b) => a + b);

        if (locationData.length === 0) {
            return [0, 0];
        }

        const levelsLocation = [];
        const scoresLocation = [];

        locationData.forEach(value => {
            levelsLocation.push(value.number_of_level)
            scoresLocation.push(value.score);
        });

        const levelsSumLocation = levelsLocation.reduce((a, b) => a + b);
        const scoresSumLocation = scoresLocation.reduce((a, b) => a + b);
        const percentageLocation = Math.round((scoresSumLocation / levelsSumLocation) * 100);

        return [percentageLocation, pointsLocation];
    };

    const totalGames = personnalData.length;

    const donnees = {
        name: name,
        totalGames: totalGames,
        worldPercentage: getPointsByLocation("World")[0],
        worldPoints: getPointsByLocation("World")[1],
        europePercentage: getPointsByLocation("Europe")[0],
        europePoints: getPointsByLocation("Europe")[1],
        africaPercentage: getPointsByLocation("Africa")[0],
        africaPoints: getPointsByLocation("Africa")[1],
        asiaPercentage: getPointsByLocation("Asia")[0],
        asiaPoints: getPointsByLocation("Asia")[1],
        americasPercentage: getPointsByLocation("Americas")[0],
        americasPoints: getPointsByLocation("Americas")[1],
        oceaniaPercentage: getPointsByLocation("Oceania")[0],
        oceaniaPoints: getPointsByLocation("Oceania")[1],
        pointsTotal: pointsTotal,
        percentageTotal: percentageTotal,
        bestTime: bestTime
    };
    return donnees;
};

export default dataPlayer;