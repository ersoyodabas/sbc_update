document.getElementById("updateButton").addEventListener("click", () => {
    const extensionId = chrome.runtime.id; // Eklentinin kimliği
    const updateUrl = "https://ersoyodabas.github.io/sbc_update/updates.xml";
  
    fetch(updateUrl)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const version = xmlDoc.getElementsByTagName("updatecheck")[0].getAttribute("version");
        const currentVersion = chrome.runtime.getManifest().version;
  
        if (version > currentVersion) {
          // Yeni bir sürüm varsa eklentiyi güncelle
          setTimeout(() => {
            chrome.management.setEnabled(extensionId, false, () => {
              chrome.management.setEnabled(extensionId, true, () => {
                // Güncelleme tamamlandıktan sonra bir mesaj göster
                chrome.notifications.create('update-complete', {
                  type: 'basic',
                  iconUrl: 'icon48.png',
                  title: 'Güncelleme Tamamlandı',
                  message: 'Eklenti başarıyla güncellendi.',
                });
              });
            });
          }, 100); // Popup penceresinin kapanmasını 100 ms geciktir
        } else {
          document.getElementById("message").textContent = "Eklenti zaten güncel.";
        }
      })
      .catch(error => {
        console.error("Güncelleme kontrolü başarısız:", error);
        document.getElementById("message").textContent = "Güncelleme kontrolü başarısız.";
      });
  });