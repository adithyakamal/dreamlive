/**
 * DreamLive Dynamic Video Pool System
 * Automatically discovers all video assets in the public folder
 * and distributes them uniquely across stream cards with zero duplicates.
 */

// 1. Dynamic discovery of all video files in public/ using Vite's import.meta.glob
const videoModules = import.meta.glob('/public/*.{mp4,webm,mov}', { eager: true });

/**
 * Extracts and formats all clean public URL paths for discovered video assets
 * e.g., '/video21.mp4', '/7914841-hd_1280_720_30fps.mp4', etc.
 */
export const getAllAvailableVideos = () => {
  const discovered = Object.keys(videoModules).map((key) => {
    // Transform '/public/video.mp4' -> '/video.mp4'
    return key.replace(/^\/public/, '');
  });

  // Comprehensive fallback list of known public video files in case of build/SSR environments
  const fallbackVideos = [
    '/7914841-hd_1280_720_30fps.mp4',
    '/29851-377742187_small.mp4',
    '/313955_small.mp4',
    '/6944165-hd_1080_1920_24fps.mp4',
    '/6951172-hd_1080_1920_24fps.mp4',
    '/9481098-hd_1080_1920_24fps.mp4',
    '/15556887_1920_1080_60fps.mp4',
    '/197621-905015075_small.mp4',
    '/video21.mp4',
    '/video22.mp4',
    '/video23.mp4',
    '/video24.mp4',
    '/video25.mp4',
    '/video26.mp4',
  ];

  // Merge discovered + fallback, ensuring only unique valid strings
  const combined = Array.from(new Set([...discovered, ...fallbackVideos])).filter(Boolean);
  return combined;
};

/**
 * Fisher-Yates shuffle algorithm for truly random, non-repeating video pool distribution
 */
export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Assigns one unique video to every stream card without repetition.
 * Only reuses a video when the number of cards exceeds the number of available unique videos.
 *
 * @param {Array} cards - The stream / user cards to assign videos to
 * @param {Object} options - Optional configuration (e.g. shuffle, excludeList)
 * @returns {Array} Cards with unique video properties assigned
 */
export const assignUniqueVideosToCards = (cards = [], options = {}) => {
  if (!Array.isArray(cards) || cards.length === 0) return [];

  const { shuffle = false, excludeList = [] } = options;

  let basePool = getAllAvailableVideos().filter((v) => !excludeList.includes(v));
  if (basePool.length === 0) {
    basePool = getAllAvailableVideos();
  }

  // Shuffle if requested, otherwise maintain consistent unique sequential distribution
  const videoPool = shuffle ? shuffleArray(basePool) : [...basePool];

  let currentPool = [...videoPool];

  return cards.map((card, index) => {
    // If pool is exhausted (more cards than available unique videos), refill it
    if (currentPool.length === 0) {
      currentPool = shuffle ? shuffleArray(basePool) : [...basePool];
    }

    // Pop the next unique video from the pool
    const assignedVideo = currentPool.shift();

    return {
      ...card,
      video: assignedVideo,
      videoIndex: index,
    };
  });
};
