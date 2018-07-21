/**
 * Service for getting downloads data for specific npm package.
 *
 * Documentation here: https://github.com/npm/download-counts
 */

const ENDPOINT = 'https://api.npmjs.org/downloads/range';
const DEFAULT_PERIOD = 'last-month';

class NPMService {
  async getDownloadsRanges(packageId, dateFrom = null, dateTo = null) {
    try {
      const period = (dateFrom && dateTo) ? `${dateFrom}:${dateTo}` : DEFAULT_PERIOD;
      const url = `${ENDPOINT}/${period}/${packageId}`;
      console.log('NPMService.fetch', url);
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
