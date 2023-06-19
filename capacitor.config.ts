import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ma.askgs.mobile',
  appName: 'MyAsk',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
