import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Song from '.';

const renderSong = (
    <Song
        uri='testimage'
        title="Yang Terdalam"
        album="Taman Langit" 
        image={''} 
        artists={''} 
        duration={0} 
        selectState={function (): void {
            throw new Error('Function not implemented.');
        } } isSelected={false}    />
);

describe("Song", () => {
    test("Song Image Rendered", () => {
      render(renderSong);
      const songImage = screen.getByTestId("song-image");
      expect(songImage).toBeInTheDocument();
    });

    test("Song Title Rendered", async () => {
      render(renderSong);
      const songTitle = screen.findByTestId("song-title");
      expect((await songTitle).textContent).toBe("Yang Terdalam");
    });

    test("Song Album Rendered", async () => {
      render(renderSong);
      const songAlbum = screen.findByTestId("song-album");
      expect((await songAlbum).textContent).toBe("Taman Langit");
    });

    test("Song Button Rendered", async () => {
      render(renderSong);
      const songButton = screen.findByTestId("song-button");
      expect((await songButton).textContent).toBe("Select");
    });
  });
  