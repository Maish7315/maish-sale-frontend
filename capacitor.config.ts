import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.maishsalesync.app',
  appName: 'Maish Sale Sync',
  webDir: 'dist',
  plugins: {
    Camera: {
      allowEditing: true,
      saveToGallery: true,
      quality: 90,
    },
  },
};

export default config;