const logger = {
    error: (message, meta) => {
      console.error(`[ERROR] ${message}`);
      if (meta) {
        console.error('Additional Info:', meta);
      }
    },
    info: (message, meta) => {
      console.log(`[INFO] ${message}`);
      if (meta) {
        console.log('Additional Info:', meta);
      }
    },
    warn: (message, meta) => {
      console.warn(`[WARN] ${message}`);
      if (meta) {
        console.warn('Additional Info:', meta);
      }
    },
  };
  
  export default logger;