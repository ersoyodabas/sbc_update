document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.getElementById("checkUpdate");
    if (!updateButton) {
        console.error("Check Update button not found!");
        return;
    }

    updateButton.addEventListener("click", async () => {
        const updateUrl = "https://ersoyodabas.github.io/testapp/github/updates.xml"; // XML dosyasının URL'si
        const currentVersion = chrome.runtime.getManifest().version;
        const updateStatus = document.getElementById("updateStatus");

        try {
            // XML'i indir
            const response = await fetch(updateUrl);
            if (!response.ok) throw new Error("XML dosyası alınamadı");

            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            // XML'deki versiyonu al
            const version = xmlDoc.querySelector("updatecheck").getAttribute("version");
            const crxUrl = xmlDoc.querySelector("updatecheck").getAttribute("codebase");

            if (version > currentVersion) {
                updateStatus.textContent = `New version (${version}) available. Downloading...`;

                // CRX dosyasını indirmek için bir bağlantı oluştur
                const a = document.createElement("a");
                a.href = crxUrl;
                a.download = "extension.crx";
                a.textContent = "Download New Version";
                document.body.appendChild(a);
            } else {
                updateStatus.textContent = "Your extension is up-to-date.";
            }
        } catch (error) {
            console.error(error);
            updateStatus.textContent = "Error checking for updates.";
        }
    });
});
