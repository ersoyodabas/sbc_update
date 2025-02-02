document.getElementById("updateButton").addEventListener("click", () => {
    debugger;
    const extensionId = chrome.runtime.id; // Eklentinin kimliği
    debugger;
    const updateUrl = "https://ersoyodabas.github.io/testapp/github/updates.xml";
    debugger;
  
    fetch(updateUrl)
      .then(response => response.text())
      .then(data => {
        console.log(data,11);
        debugger;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        console.log(xmlDoc,15);
        const version = xmlDoc.getElementsByTagName("updatecheck")[0].getAttribute("version");
        console.log(version,16);
        const currentVersion = chrome.runtime.getManifest().version;
        if (version > currentVersion) {
            debugger;
          // Yeni bir sürüm varsa eklentiyi güncelle
         // Yeni bir sürüm varsa Chrome'un güncelleme mekanizmasını tetikle
      chrome.runtime.requestUpdateCheck((status) => {
        if (status === "update_available") {
          console.log("Güncelleme bulundu, yükleniyor...");
        } else if (status === "no_update") {
          console.log("Eklenti zaten güncel.");
        } else if (status === "throttled") {
          console.log("Güncelleme kontrolü kısıtlandı, daha sonra tekrar deneyin.");
        }
      });
            chrome.runtime.reload();

        } else {
          document.getElementById("message").textContent = "Eklenti zaten güncel.";
        }
      })
      .catch(error => {
        alert();
        debugger;
        console.error("Güncelleme kontrolü başarısız:", error);
        document.getElementById("message").textContent = "Güncelleme kontrolü başarısız.";
      });
  });