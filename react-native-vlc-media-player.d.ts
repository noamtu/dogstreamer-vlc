declare module 'react-native-vlc-media-player/VLCPlayer' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface VLCPlayerProps {
      style?: ViewStyle;
      source: { uri: string };
      autoplay?: boolean;
      onEnd?: () => void;
      onPlaying?: () => void;
      onPaused?: () => void;
      onStopped?: () => void;
      onBuffering?: () => void;
      onError?: (error: any) => void;
    }
  
    export class VLCPlayer extends Component<VLCPlayerProps> {}
  }