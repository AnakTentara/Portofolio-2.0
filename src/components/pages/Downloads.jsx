import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, File, Download, ArrowLeft, Home, Search, 
  ChevronRight, RefreshCw, AlertTriangle, Loader2, FileImage, 
  FileText, FileArchive, Video, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDownloadApi } from '../../hooks/useDownloadApi';
import { getFileSize } from '../../utils/fileSystem';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : '/api';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'txt'];
  const archiveExtensions = ['zip', 'rar', '7z'];
  const videoExtensions = ['mp4', 'webm', 'mov'];

  if (imageExtensions.includes(extension)) return <FileImage className="text-blue-400" size={20} />;
  if (documentExtensions.includes(extension)) return <FileText className="text-emerald-400" size={20} />;
  if (archiveExtensions.includes(extension)) return <FileArchive className="text-amber-400" size={20} />;
  if (videoExtensions.includes(extension)) return <Video className="text-rose-400" size={20} />;
  return <File className="text-slate-400" size={20} />;
};

const getFilePreviewUrl = (filePath) => {
  return `${API_BASE}/files/download/${encodeURIComponent(filePath)}`;
};

const FilePreview = ({ file }) => {
  const extension = file.name.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);

  if (isImage) {
    return (
      <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
        <img 
          src={getFilePreviewUrl(file.path)} 
          alt={file.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-slate-400">
      {getFileIcon(file.name)}
    </div>
  );
};

const Downloads = () => {
  const { files, stats, loading, error, refresh, downloadFile } = useDownloadApi();
  const [currentPath, setCurrentPath] = useState([]); // Array of folder names/paths
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingFile, setDownloadingFile] = useState(null);

  // Get current folder level in the directory tree structure
  const currentFolder = useMemo(() => {
    if (!files || files.length === 0) return { items: [] };

    let current = files;
    for (const folderName of currentPath) {
      const found = current.find(item => item.type === 'folder' && item.name === folderName);
      if (found && found.items) {
        current = found.items;
      } else {
        return { items: [] };
      }
    }
    return { items: current };
  }, [files, currentPath]);

  const handleFolderOpen = (folderName) => {
    setCurrentPath(prev => [...prev, folderName]);
  };

  const handleFolderBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(prev => prev.slice(0, -1));
    }
  };

  const handleDownload = async (file) => {
    setDownloadingFile(file);
    try {
      await downloadFile(file.path, file.name);
    } catch (err) {
      console.error('Download fail:', err);
    } finally {
      // Small delay for smooth loader display
      setTimeout(() => setDownloadingFile(null), 1000);
    }
  };

  const filteredItems = useMemo(() => {
    if (!currentFolder || !currentFolder.items) return [];
    let list = [...currentFolder.items];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      // Recursive deep search helper when searching
      const deepFilter = (itemsList) => {
        let result = [];
        for (const item of itemsList) {
          if (item.name.toLowerCase().includes(searchLower)) {
            result.push(item);
          } else if (item.type === 'folder' && item.items) {
            const nested = deepFilter(item.items);
            if (nested.length > 0) {
              result.push({ ...item, items: nested });
            }
          }
        }
        return result;
      };
      list = deepFilter(currentFolder.items);
    }

    return list;
  }, [currentFolder, searchTerm]);

  const { folders, filesList } = useMemo(() => {
    const folders = filteredItems.filter(item => item.type === 'folder');
    const filesList = filteredItems.filter(item => item.type === 'file');
    return { folders, filesList };
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-transparent text-white pt-24 md:pt-32 pb-20 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-blue w-[400px] h-[400px] -top-20 -left-20 opacity-15" />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-10 right-10 opacity-20" />
      </div>

      <div className="container-portfolio relative z-10 max-w-5xl">
        {/* Navigation & Header Panel */}
        <div className="glass-card p-5 md:p-6 mb-8 border border-white/5 bg-slate-950/40 backdrop-blur-md rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              {currentPath.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFolderBack}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all flex items-center justify-center"
                >
                  <ArrowLeft size={18} />
                </motion.button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-primary-400" />
                  <h1 className="text-2xl md:text-3xl font-black text-white leading-none" style={{ fontFamily: 'Archivo, sans-serif' }}>
                    {currentPath.length === 0 ? 'Downloads' : currentPath[currentPath.length - 1]}
                  </h1>
                </div>
                <p className="text-slate-500 text-xs mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Browse downloadable assets, plugins and Minecraft skins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={refresh}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all flex items-center justify-center"
                title="Refresh Folder"
              >
                <RefreshCw size={16} />
              </motion.button>

              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all flex items-center justify-center"
                >
                  <Home size={16} />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Breadcrumbs Navigation */}
          <div className="flex items-center flex-wrap gap-1.5 text-sm text-slate-400 border-b border-white/5 pb-4 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <button 
              onClick={() => setCurrentPath([])} 
              className={`hover:text-white transition-colors flex items-center gap-1 ${currentPath.length === 0 ? 'text-primary-400 font-bold' : ''}`}
            >
              Downloads
            </button>
            {currentPath.map((path, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} className="text-slate-600" />
                <button
                  onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
                  className={`hover:text-white transition-colors ${idx === currentPath.length - 1 ? 'text-primary-400 font-bold' : ''}`}
                >
                  {path}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Explorer Search Bar */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm text-white placeholder-slate-500"
              placeholder="Search files and folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            />
          </div>
        </div>

        {/* Folder / File Explorer Area */}
        <div className="glass-card p-6 border border-white/5 bg-slate-950/30 backdrop-blur-md rounded-2xl shadow-xl min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Loading directory contents...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4 text-center">
              <AlertTriangle className="w-12 h-12 text-rose-500" />
              <div>
                <p className="text-white font-bold text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>Connection Error</p>
                <p className="text-slate-400 text-sm mt-1 max-w-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {error}. Make sure the backend server is running.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refresh}
                className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-500 text-white font-semibold text-sm transition-all"
              >
                Try Again
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Folders Section */}
              {folders.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Folders
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {folders.map((folder, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.015, y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleFolderOpen(folder.name)}
                        className="flex items-center space-x-3.5 p-3.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 transition-all duration-200 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                          <Folder size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white text-sm truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {folder.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {folder.items?.length || 0} items
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files Section */}
              {filesList.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Files
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filesList.map((file, idx) => {
                      const downloadCount = stats[file.path] || 0;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.01, y: -1 }}
                          className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3.5 min-w-0">
                            <FilePreview file={file} />
                            <div className="min-w-0">
                              <p className="font-semibold text-white text-sm truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {file.name}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                <span>{getFileSize(file.size)}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                <span className="text-primary-400 font-medium">{downloadCount} downloads</span>
                              </div>
                            </div>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleDownload(file)}
                            className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary-400 hover:bg-primary hover:text-white transition-all flex items-center justify-center flex-shrink-0"
                            title="Download File"
                          >
                            <Download size={16} />
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {folders.length === 0 && filesList.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-2 text-center">
                  <Folder className="w-12 h-12 text-slate-700" />
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>This directory is empty</p>
                  {searchTerm && (
                    <p className="text-xs text-slate-500 max-w-xs mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      No items matched "{searchTerm}". Try checking your spelling or clear search filters.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Download Progress Overlay */}
      <AnimatePresence>
        {downloadingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 w-full max-w-sm border border-white/10 bg-slate-900/90 text-center rounded-2xl shadow-2xl"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                {getFileIcon(downloadingFile.name)}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Archivo, sans-serif' }}>Downloading Asset</h3>
              <p className="text-slate-400 text-xs truncate max-w-xs mx-auto mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {downloadingFile.name}
              </p>
              
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
              <p className="text-slate-500 text-[10px]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Streaming file from Ground Station...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Downloads;