import api from "./api";

export const scanService = {
  uploadLabel: (file) => {
    const form = new FormData();
    form.append("file", file);
    return api.post("/scan/image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  scanBarcode: (barcode) => api.post("/scan/barcode", { barcode }),
  getHistory: () => api.get("/scan/history"),
};
