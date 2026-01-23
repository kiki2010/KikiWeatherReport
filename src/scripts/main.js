async function main() {
    try {
        //Call get Position
        const {lat, lon, acc} = await getPosition();
        console.log(lat, lon, acc);

        //Get Stations and select the best
        const stationRes = await fetch(`/api/stations?lat=${lat}&lon=${lon}`);
        const stationsData = await stationRes.json();

        const stationId = selectBestStation(stationsData.location);

        if (!stationId) {
            throw new Error("no valid weather station");
        }

        console.log(stationId);

        //Get current data
        const currentRes = await fetch(`/api/current?stationId=${stationId.id}`);

        if (!currentRes.ok) {
            throw new Error("Error fetching current data")
        }

        const currentData = await currentRes.json();

        console.log("Current Weather:", currentData);

        //Get forecast data
        const forecastRes = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);

        if (!forecastRes.ok) {
            throw new Error("Error fetching forecast data");
        }

        const forecastData = await forecastRes.json();

        console.log("Forecast 5 days:", forecastData);

    } catch (e) {
        console.error("Error:", e);
    }
}

main();

//Get User position
function getPosition() {
    return new Promise((resolve, reject) =>  {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                    acc: pos.coords.accuracy
                });
            },
            (e) => reject(e)
        );
    });
}

//Get Nearest stations
function selectBestStation(loc) {
    const stations = [];

    for (let i = 0; i < loc.stationId.length; i++) {
        if (loc.updateTimeUtc[i] !== null) {
            stations.push({
                id: loc.stationId[i],
                name: loc.stationName[i],
                distanceKm: loc.distanceKm[i],
                updateTimeUtc: loc.updateTimeUtc[i]
            });
        }
    }

    stations.sort((a, b) => {
        if (a.distanceKm !== b.distanceKm) {
            return a.distanceKm - b.distanceKm;
        }
        return b.updateTimeUtc - a.updateTimeUtc;
    });

    if (stations.length === 0) {
        throw new Error('No stations found');
    }

    return stations[0];
}