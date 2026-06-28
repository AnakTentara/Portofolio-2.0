import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : '/api';

export function useDownloadApi() {
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch files list from backend
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/files`);
      if (res.data && res.data.success) {
        setFiles(res.data.data);
      } else {
        throw new Error(res.data.message || 'Failed to fetch files');
      }
    } catch (err) {
      console.error('[useDownloadApi] Fetch files error:', err);
      setError(err.message || 'Connection error to backend API');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch download statistics
  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/downloads/stats`);
      if (res.data && res.data.success) {
        // Convert array to a keyed object: { file_path: download_count }
        const statsMap = {};
        res.data.data.forEach(item => {
          statsMap[item.file_path] = item.download_count;
        });
        setStats(statsMap);
      }
    } catch (err) {
      console.error('[useDownloadApi] Fetch stats error:', err);
    }
  }, []);

  // Download a file
  const performDownload = useCallback(async (filePath, fileName) => {
    try {
      // 1. Trigger browser file download streaming directly from server
      const downloadUrl = `${API_BASE}/files/download/${encodeURIComponent(filePath)}`;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2. Optimistic update of local download count
      setStats(prev => ({
        ...prev,
        [filePath]: (prev[filePath] || 0) + 1
      }));

      // 3. Re-fetch actual stats from backend to sync
      setTimeout(() => {
        fetchStats();
      }, 1500);

      return true;
    } catch (err) {
      console.error('[useDownloadApi] Download trigger error:', err);
      throw err;
    }
  }, [fetchStats]);

  useEffect(() => {
    fetchFiles();
    fetchStats();
  }, [fetchFiles, fetchStats]);

  return {
    files,
    stats,
    loading,
    error,
    refresh: fetchFiles,
    downloadFile: performDownload
  };
}
