export const handleDownload = (abhaCardResult: string | undefined) => {
  try {
    if (abhaCardResult) {
      // Convert base64 to binary
      const byteCharacters = atob(abhaCardResult);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // Create a temporary link element
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ABHA-card.png";

      // Trigger the download
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("AbhaCardResult is undefined. Cannot download.");
    }
  } catch (error) {
    console.error("Error occurred while handling download:", error);
  }
};
