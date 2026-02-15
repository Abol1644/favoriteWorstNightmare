export interface Track {
  id: number;
  title: string;
  duration: string;      // formatted "mm:ss"
  file: string;          // path relative to public, e.g. "/audio/01-Brianstorm.mp3"
  lyrics: string;        // path relative to public, e.g. "/lyrics/01-Brianstorm.txt"
}