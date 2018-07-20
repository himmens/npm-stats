const ENDPOINT = 'https://api.npmjs.org/downloads/range/last-week/';

class NPMService {
  async getDownloadsRanges(packageId) {
    try {
      const url = `${ENDPOINT}${packageId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log('NPMService.getDownloadsRanges', e);
    }
    return null;
  }
}

export default new NPMService();
